// 前端 API 调用示例 - 可集成到 main.js

const API_URL = 'http://localhost:5000/api';

// 注册
async function handleRegister(username, email, password) {
  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, email, password })
    });
    
    const data = await response.json();
    if (response.ok) {
      alert('注册成功！请登录');
      return true;
    } else {
      alert(data.message || '注册失败');
      return false;
    }
  } catch (error) {
    console.error('注册错误:', error);
    alert('注册请求失败，请检查服务器');
  }
}

// 登录
async function handleLogin(username, password) {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });
    
    const data = await response.json();
    if (response.ok) {
      // 保存 token
      localStorage.setItem('token', data.token);
      localStorage.setItem('username', data.user.username);
      alert(`欢迎回来，${data.user.username}！`);
      // 跳转到首页或仪表板
      return true;
    } else {
      alert(data.message || '登录失败');
      return false;
    }
  } catch (error) {
    console.error('登录错误:', error);
    alert('登录请求失败，请检查服务器');
  }
}

// 获取用户信息
async function getUserProfile() {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('未找到令牌，请先登录');
      return null;
    }
    
    const response = await fetch(`${API_URL}/auth/profile`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      console.error(data.message);
      return null;
    }
  } catch (error) {
    console.error('获取用户信息错误:', error);
    return null;
  }
}

// 登出
async function handleLogout() {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (response.ok) {
      // 清除本地存储
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      alert('登出成功');
      return true;
    }
  } catch (error) {
    console.error('登出错误:', error);
  }
}

// 检查是否已登录
function isLoggedIn() {
  return !!localStorage.getItem('token');
}

// 获取当前用户名
function getCurrentUsername() {
  return localStorage.getItem('username');
}

// 示例：在表单提交时调用
// document.getElementById('registerForm').addEventListener('submit', async (e) => {
//   e.preventDefault();
//   const username = document.getElementById('regUsername').value;
//   const email = document.getElementById('regEmail').value;
//   const password = document.getElementById('regPassword').value;
//   await handleRegister(username, email, password);
// });
