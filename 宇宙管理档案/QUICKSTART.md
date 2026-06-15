# 🚀 快速启动指南

## 项目结构
```
宇宙管理档案/
├── index.html          # 前端首页
├── main.js            # 前端 JavaScript
├── style.css          # 前端样式
├── api-examples.js    # API 调用示例代码
└── backend/           # 后端项目
    ├── package.json   # NPM 依赖配置
    ├── server.js      # Express 服务器
    ├── database.sql   # 数据库初始化脚本
    ├── .env.example   # 环境变量示例
    ├── README.md      # API 文档
    ├── config/
    │   └── database.js     # 数据库连接配置
    ├── models/
    │   └── User.js         # 用户模型
    ├── routes/
    │   └── auth.js         # 认证路由
    └── middleware/
        └── auth.js         # JWT 验证中间件
```

## 快速启动步骤

### 第 1 步：配置 MySQL
1. 打开 MySQL Workbench 或命令行
2. 执行 `backend/database.sql` 中的 SQL 语句创建数据库和表

或在命令行执行：
```bash
mysql -u root -p < backend/database.sql
```

### 第 2 步：安装后端依赖
```bash
cd backend
npm install
```

### 第 3 步：配置环境变量
1. 复制 `.env.example` 为 `.env`
```bash
cp .env.example .env
```

2. 编辑 `.env` 文件，更新 MySQL 密码：
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=你的MySQL密码  # 改这里
DB_NAME=cosmos_archive
DB_PORT=3306

JWT_SECRET=change_this_secret_key_in_production  # 改这里（可选，但推荐）
JWT_EXPIRE=7d
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### 第 4 步：启动后端服务
```bash
npm start
# 或使用 nodemon（自动重启）
npm run dev
```

输出应该显示：
```
✅ 服务器运行在 http://localhost:5000
📝 前端 URL: http://localhost:3000
```

### 第 5 步：在前端集成 API
在 `main.js` 中引入 `api-examples.js` 中的函数，或复制相关代码到你的登录/注册表单中。

示例：
```html
<!-- 在 index.html 中添加 -->
<script src="api-examples.js"></script>
```

然后在表单提交事件中调用：
```javascript
handleLogin(username, password);
handleRegister(username, email, password);
```

## 测试 API

### 使用 Postman 或 curl 测试

**注册：**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"password123"}'
```

**登录：**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"password123"}'
```

**获取个人资料（需要用登录返回的 token）：**
```bash
curl -X GET http://localhost:5000/api/auth/profile \
  -H "Authorization: Bearer <your_token_here>"
```

## 常见问题

### 1. 报错："Cannot find module 'mysql2'"
**解决：** 运行 `npm install`

### 2. MySQL 连接失败
**检查：**
- MySQL 服务是否正在运行
- 数据库用户名/密码是否正确
- 数据库是否已创建

### 3. CORS 错误
**原因：** 前端和后端的 URL 不匹配
**解决：** 检查 `.env` 中的 `FRONTEND_URL` 是否正确

### 4. 令牌验证失败
**检查：**
- 是否正确发送了 `Authorization: Bearer <token>`
- 令牌是否过期

## 下一步

- [ ] 集成注册/登录表单到前端
- [ ] 添加用户资料编辑功能
- [ ] 实施密码重置功能
- [ ] 添加邮箱验证
- [ ] 部署到生产环境（更改 JWT_SECRET、数据库密码等）
- [ ] 配置 HTTPS
- [ ] 添加请求速率限制

## 联系和支持
如有问题，请检查 `backend/README.md` 获取详细 API 文档。
