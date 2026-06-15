# 宇宙管理档案 - 后端 API 文档

## 项目概述
这是宇宙管理档案的后端服务，提供用户认证（注册/登录）和用户管理功能。

## 技术栈
- Node.js + Express
- MySQL
- JWT 认证
- bcryptjs 密码加密

## 安装和配置

### 1. 安装依赖
```bash
cd backend
npm install
```

### 2. 配置数据库
```bash
# 使用 MySQL 客户端执行 database.sql
mysql -u root -p < database.sql
```

或在 MySQL 工作台中直接运行 `database.sql` 中的 SQL 语句。

### 3. 环境配置
将 `.env.example` 复制为 `.env` 并填入你的配置：
```bash
cp .env.example .env
```

编辑 `.env` 文件：
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=cosmos_archive
DB_PORT=3306

JWT_SECRET=your_secret_key_change_this
JWT_EXPIRE=7d

PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### 4. 启动服务器

**生产环境：**
```bash
npm start
```

**开发环境（使用 nodemon 自动重启）：**
```bash
npm run dev
```

服务器将运行在 `http://localhost:5000`

## API 端点

### 注册
**POST** `/api/auth/register`

请求体：
```json
{
  "username": "用户名",
  "email": "邮箱@example.com",
  "password": "密码123456"
}
```

响应：
```json
{
  "message": "注册成功",
  "userId": 1,
  "username": "用户名"
}
```

### 登录
**POST** `/api/auth/login`

请求体：
```json
{
  "username": "用户名",
  "password": "密码123456"
}
```

响应：
```json
{
  "message": "登录成功",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": 1,
    "username": "用户名",
    "email": "邮箱@example.com"
  }
}
```

### 获取用户信息
**GET** `/api/auth/profile`

需要在请求头中带上 JWT 令牌：
```
Authorization: Bearer <token>
```

响应：
```json
{
  "id": 1,
  "username": "用户名",
  "email": "邮箱@example.com",
  "created_at": "2024-01-01T10:00:00.000Z"
}
```

### 登出
**POST** `/api/auth/logout`

需要在请求头中带上 JWT 令牌：
```
Authorization: Bearer <token>
```

## 前端集成示例

### 注册
```javascript
async function register(username, email, password) {
  const response = await fetch('http://localhost:5000/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password })
  });
  return response.json();
}
```

### 登录
```javascript
async function login(username, password) {
  const response = await fetch('http://localhost:5000/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  const data = response.json();
  // 存储 token
  localStorage.setItem('token', data.token);
  return data;
}
```

### 发送认证请求
```javascript
async function getProfile() {
  const token = localStorage.getItem('token');
  const response = await fetch('http://localhost:5000/api/auth/profile', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
  return response.json();
}
```

## 数据库结构

### users 表
- `id` - 用户 ID
- `username` - 用户名（唯一）
- `email` - 邮箱（唯一）
- `password` - 加密后的密码
- `created_at` - 创建时间
- `last_login` - 最后登录时间
- `is_active` - 是否激活

### user_profiles 表
用于存储用户的详细信息

### user_logs 表
用于记录用户活动日志

## 错误处理

所有错误响应都包含 `message` 字段，例如：
```json
{
  "message": "用户名或密码错误",
  "errors": []
}
```

## 安全建议

1. **生产环境**：
   - 更改 JWT_SECRET 为强随机密钥
   - 将数据库密码存储在安全的环境变量中
   - 使用 HTTPS
   - 启用 CORS 限制

2. **密码安全**：
   - 密码已使用 bcryptjs 进行哈希处理
   - 建议最少 8 个字符

3. **令牌安全**：
   - JWT 令牌存储在客户端 localStorage 中
   - 建议在敏感操作时重新验证
   - 实施请求速率限制

## 故障排除

### 数据库连接失败
- 检查 MySQL 服务是否运行
- 验证 `.env` 中的数据库凭据
- 确保数据库 `cosmos_archive` 已创建

### CORS 错误
- 检查 `.env` 中的 `FRONTEND_URL` 是否正确
- 确保前端 URL 与配置匹配

### 令牌验证失败
- 检查请求头中是否正确包含 `Authorization: Bearer <token>`
- 验证令牌是否过期

## 许可证
ISC
