# 在线客服系统SDK

本项目是一个独立的在线客服系统SDK，提供了完整的侧边栏客服解决方案，支持响应式布局和现代化的客服交互体验。

## 项目简介

本项目是一个轻量级但功能完整的客服系统前端SDK，实现了：

- ✅ 使用iframe嵌入客服窗口
- ✅ 响应式设计，适配不同尺寸的设备
- ✅ 商用级别的稳定性与安全性
- ✅ 支持多种部署方式（传统服务器、Vercel、Netlify等）
- ✅ 随机访客ID生成与记忆

## 核心功能

- 嵌入式客服面板
- 响应式布局适配
- 随机访客ID生成与记忆
- WebSocket实时通信支持
- 连接状态监控与自动重连
- 完整的错误处理机制

## 本地开发

### 前置要求

- Node.js (>=16.0.0)

### 启动方法

1. 安装依赖（如果有）：
```bash
npm install
```

2. 启动本地服务器：
```bash
npm run dev
```

3. 打开浏览器，访问 `http://localhost:8080` 查看效果

## 配置说明

### 客服服务器配置

在 `public/index.html` 文件中，您需要修改以下配置常量来设置您的客服系统服务器地址：

```javascript
// 配置常量
const CONFIG = {
    // 客服系统服务器地址
    serverUrl: 'https://your-chat-service.com',
    // 是否启用机器人优先模式
    enableBotFirst: false
};
```

将 `https://your-chat-service.com` 替换为您实际的客服系统服务地址。

将 `https://your-chat-service.com/chat` 替换为您实际的客服系统服务地址。

### 客服窗口打开方式配置

项目支持在侧边栏中嵌入客服窗口，无需额外配置。如果遇到跨域问题，可以修改 `public/index.html` 文件中的相关代码以支持在新窗口中打开。

- **iframe方式**（默认）：在侧边栏面板中直接嵌入客服窗口
- **window方式**：在新窗口中打开客服页面，可有效避免跨域限制

### 文件结构说明

- `public/index.html` - 主页面，包含侧边栏基础结构和客服窗口实现
- `package.json` - 项目配置和脚本定义
- `build.js` - 构建脚本
- `sw.js` - Service Worker文件，用于缓存管理
- `vercel.json` - Vercel部署配置文件
- `.gitignore` - Git忽略规则
- `LICENSE` - 项目许可证文件

## 功能实现说明

### 1. 客服系统集成

作为SDK的核心功能，提供了完整的客服系统集成能力：
- 通过iframe无缝嵌入客服聊天界面
- 支持WebSocket实时通信，确保消息及时送达
- 自动生成唯一访客ID，确保会话连续性
- 提供连接状态监控和自动重连机制
- 支持响应式设计，适配不同设备屏幕
- 内置错误处理和重试机制，提升用户体验

## 部署说明

将项目文件部署到您的Web服务器上即可，无需特殊构建过程。

### 支持的部署方式

- **传统Web服务器**：将所有文件上传到Nginx、Apache等Web服务器的根目录
- **Vercel**：项目包含vercel.json配置文件，可直接部署到Vercel
- **Netlify**：支持一键部署
- **GitHub Pages**：可发布到GitHub Pages服务

### 缓存控制配置

项目已包含Vercel的缓存控制配置，其他服务器可参考以下示例：

#### Nginx配置
```nginx
location / {
    add_header Cache-Control "public, max-age=3600";
    # 其他配置...
}
```

#### Apache配置
```apache
<IfModule mod_headers.c>
    Header set Cache-Control "public, max-age=3600"
</IfModule>
```

## 注意事项

1. 确保客服系统服务地址正确配置，否则无法正常加载客服窗口
2. 响应式设计支持移动端和桌面端，但在小屏幕设备上可能需要调整部分样式
3. 项目使用了Font Awesome图标库，确保网络连接正常以加载图标
4. 如果遇到跨域问题，可考虑调整客服窗口的加载方式

## 许可证

本项目采用MIT许可证 - 详见LICENSE文件