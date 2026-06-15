const bcrypt = require('bcryptjs');
const pool = require('../config/database');

class User {
  // 创建新用户
  static async create(username, email, password) {
    try {
      const connection = await pool.getConnection();
      
      // 检查用户是否已存在
      const [existing] = await connection.query(
        'SELECT id FROM users WHERE username = ? OR email = ?',
        [username, email]
      );
      
      if (existing.length > 0) {
        throw new Error('用户名或邮箱已存在');
      }
      
      // 加密密码
      const hashedPassword = await bcrypt.hash(password, 10);
      
      // 插入新用户
      const [result] = await connection.query(
        'INSERT INTO users (username, email, password, created_at) VALUES (?, ?, ?, NOW())',
        [username, email, hashedPassword]
      );
      
      connection.release();
      return result.insertId;
    } catch (error) {
      throw error;
    }
  }
  
  // 通过用户名查找用户
  static async findByUsername(username) {
    try {
      const connection = await pool.getConnection();
      const [rows] = await connection.query(
        'SELECT * FROM users WHERE username = ?',
        [username]
      );
      connection.release();
      return rows[0];
    } catch (error) {
      throw error;
    }
  }
  
  // 通过邮箱查找用户
  static async findByEmail(email) {
    try {
      const connection = await pool.getConnection();
      const [rows] = await connection.query(
        'SELECT * FROM users WHERE email = ?',
        [email]
      );
      connection.release();
      return rows[0];
    } catch (error) {
      throw error;
    }
  }
  
  // 通过ID查找用户
  static async findById(id) {
    try {
      const connection = await pool.getConnection();
      const [rows] = await connection.query(
        'SELECT id, username, email, created_at FROM users WHERE id = ?',
        [id]
      );
      connection.release();
      return rows[0];
    } catch (error) {
      throw error;
    }
  }
  
  // 验证密码
  static async verifyPassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
  }
  
  // 更新最后登录时间
  static async updateLastLogin(userId) {
    try {
      const connection = await pool.getConnection();
      await connection.query(
        'UPDATE users SET last_login = NOW() WHERE id = ?',
        [userId]
      );
      connection.release();
    } catch (error) {
      throw error;
    }
  }
}

module.exports = User;
