# 扣子智能聊天应用

一个基于扣子（Coze）智能体平台的聊天网站，支持一键部署到Vercel。

## 特性

- 🚀 快速部署：支持一键部署到Vercel
- 💬 智能聊天：集成扣子智能体API，提供自然语言交互能力
- 🎨 现代化UI：使用Tailwind CSS构建响应式界面
- ⚙️ 灵活配置：支持自定义Bot ID和Access Token
- 🔄 会话管理：保持对话上下文
- ✅ 连接测试：提供API连接测试功能
- 📱 PWA支持：集成pwa-install组件，支持"添加到桌面"功能，适配国内主流手机浏览器

## 一键部署到Vercel

点击下方按钮，一键部署到您的Vercel账户：

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/coze-chat-app&env=COZE_BOT_ID,COZE_ACCESS_TOKEN&envDescription=请配置您的扣子Bot ID和Access Token)

### 部署步骤

1. 点击上方"Deploy with Vercel"按钮
2. 登录您的Vercel账户
3. 在环境变量配置页面，填入您的扣子Bot ID和Access Token
4. 点击"Deploy"按钮，等待部署完成
5. 部署完成后，您将获得一个可访问的URL

## 本地开发

### 前置要求

- Node.js 18+ 
- npm 或 yarn 包管理器
- Vercel CLI（可选，用于本地开发）

### 安装步骤

1. 克隆项目

```bash
git clone https://github.com/your-username/coze-chat-app.git
cd coze-chat-app
```

2. 安装依赖

```bash
npm install
```

3. 创建环境变量文件（可选）

复制 `.env.example` 文件并重命名为 `.env.local`，填入您的扣子配置：

```bash
cp .env.example .env.local
# 编辑.env.local文件，填入您的配置
```

4. 启动开发服务器

```bash
npm run dev
# 或使用vercel CLI
vercel dev
```

5. 打开浏览器访问 `http://localhost:3000`

## 环境变量配置

部署到Vercel时，需要配置以下环境变量：

| 环境变量 | 描述 | 默认值 | 是否必需 |
|---------|------|-------|---------|
| COZE_BOT_ID | 您的扣子Bot ID | 无 | 是 |
| COZE_ACCESS_TOKEN | 您的扣子访问令牌 | 无 | 是 |
| COZE_API_URL | 扣子API地址 | `https://api.coze.cn/v3/chat` | 否 |
| NODE_ENV | 应用环境 | `production` | 否 |

## 项目结构

```
├── api/                 # API路由
│   ├── chat.js          # 主聊天API
│   ├── health.js        # 健康检查API
│   └── vercel-api-test.js # 连接测试API
├── index.html           # 主页面（集成了pwa-install组件）
├── manifest.json        # PWA清单文件
├── service-worker.js    # PWA服务工作线程
├── package.json         # 项目配置和依赖
├── vercel.json          # Vercel部署配置
└── .env.example         # 环境变量示例
```

## PWA安装功能说明

本项目集成了[pwa-install](https://github.com/pwa-builder/pwa-install)开源组件，为用户提供"添加到桌面"的便捷体验。

### 支持设备

- 📱 iOS设备：通过"分享"菜单添加到主屏幕
- 🤖 Android设备：支持小米、华为、Vivo、OPPO等主流手机浏览器
- 🌐 桌面浏览器：支持Chrome、Edge等现代浏览器

### 功能特点

- 🔄 自动适配：根据用户设备和浏览器类型提供个性化指引
- 🛡️ 防御机制：确保按钮始终可见，防止被第三方SDK隐藏或删除
- 🔧 多重备份：提供CDN备用方案和降级处理逻辑
- 📊 实时反馈：用户操作有明确的视觉反馈和状态提示

### 使用方式

1. 访问应用页面
2. 点击右上角的"添加到桌面"按钮
3. 根据提示完成安装操作
4. 安装成功后，可在设备主屏幕直接打开应用

## 如何获取扣子Bot ID和Access Token

1. 访问 [扣子智能体平台](https://www.coze.cn/)
2. 登录您的账户
3. 创建或选择一个智能体
4. 在智能体设置页面获取Bot ID
5. 前往个人设置页面，创建并获取Access Token

## 常见问题

### Q: 部署后无法正常聊天

A: 请检查以下几点：
- Vercel环境变量是否正确配置了COZE_BOT_ID和COZE_ACCESS_TOKEN
- 您的Access Token是否有效且未过期
- 尝试使用设置页面的"测试连接"功能检查API连接状态

### Q: 本地开发时API请求失败

A: 请确保：
- 已安装依赖并正确配置环境变量
- 使用`npm run dev`或`vercel dev`启动开发服务器
- 网络环境可以访问扣子API

## 许可证

本项目采用MIT许可证。

## 致谢

感谢扣子智能体平台提供的AI能力支持！