const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const authRoutes = require('./routes/auth');

const app = express();

// 中间件
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 路由
app.use('/api/auth', authRoutes);

// 基础路由
app.get('/api', (req, res) => {
  res.json({ message: '宇宙管理档案 API 服务已运行' });
});

// 404 处理
app.use((req, res) => {
  res.status(404).json({ message: '未找到此路由' });
});

// 错误处理
app.use((err, req, res, next) => {
  console.error('服务器错误:', err);
  res.status(500).json({ message: '服务器内部错误' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ 服务器运行在 http://localhost:${PORT}`);
  console.log(`📝 前端 URL: ${process.env.FRONTEND_URL || 'http://localhost:3000'}`);
});
