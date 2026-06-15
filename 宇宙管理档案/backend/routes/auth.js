const express = require('express');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const authenticateToken = require('../middleware/auth');
require('dotenv').config();

const router = express.Router();

/**
 * POST /api/auth/register
 * 用户注册
 */
router.post(
  '/register',
  [
    body('username')
      .trim()
      .isLength({ min: 3 })
      .withMessage('用户名至少3个字符'),
    body('email')
      .isEmail()
      .withMessage('请输入有效的邮箱地址'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('密码至少6个字符')
  ],
  async (req, res) => {
    try {
      // 验证输入
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      
      const { username, email, password } = req.body;
      
      // 创建用户
      const userId = await User.create(username, email, password);
      
      res.status(201).json({
        message: '注册成功',
        userId: userId,
        username: username
      });
    } catch (error) {
      console.error('注册错误:', error);
      
      if (error.message.includes('已存在')) {
        return res.status(409).json({ message: error.message });
      }
      
      res.status(500).json({ message: '注册失败，请稍后重试' });
    }
  }
);

/**
 * POST /api/auth/login
 * 用户登录
 */
router.post(
  '/login',
  [
    body('username').trim().notEmpty().withMessage('用户名不能为空'),
    body('password').notEmpty().withMessage('密码不能为空')
  ],
  async (req, res) => {
    try {
      // 验证输入
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      
      const { username, password } = req.body;
      
      // 查找用户
      const user = await User.findByUsername(username);
      if (!user) {
        return res.status(401).json({ message: '用户名或密码错误' });
      }
      
      // 验证密码
      const validPassword = await User.verifyPassword(password, user.password);
      if (!validPassword) {
        return res.status(401).json({ message: '用户名或密码错误' });
      }
      
      // 更新最后登录时间
      await User.updateLastLogin(user.id);
      
      // 生成 JWT
      const token = jwt.sign(
        { id: user.id, username: user.username, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRE || '7d' }
      );
      
      res.json({
        message: '登录成功',
        token: token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email
        }
      });
    } catch (error) {
      console.error('登录错误:', error);
      res.status(500).json({ message: '登录失败，请稍后重试' });
    }
  }
);

/**
 * GET /api/auth/profile
 * 获取当前用户信息
 */
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: '用户不存在' });
    }
    res.json(user);
  } catch (error) {
    console.error('获取用户信息错误:', error);
    res.status(500).json({ message: '获取用户信息失败' });
  }
});

/**
 * POST /api/auth/logout
 * 用户登出（可选，因为是JWT无状态）
 */
router.post('/logout', authenticateToken, (req, res) => {
  res.json({ message: '登出成功' });
});

module.exports = router;
