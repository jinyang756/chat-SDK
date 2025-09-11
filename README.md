# 扣子智能聊天应用

一个基于扣子（Coze）智能体平台的聊天网站，集成米多客客服组件无敌模式，支持一键部署到Vercel。

## 特性

- 🚀 快速部署：支持一键部署到Vercel
- 💬 智能聊天：集成扣子智能体API，提供自然语言交互能力
- 🎨 现代化UI：使用Tailwind CSS构建响应式界面
- ⚙️ 灵活配置：支持自定义Bot ID和Access Token
- 🔄 会话管理：保持对话上下文
- ✅ 连接测试：提供API连接测试功能
- 📱 PWA支持：集成pwa-install组件，支持"添加到桌面"功能，适配国内主流手机浏览器
- 🛡️ 客服组件无敌模式：确保客服按钮始终可见，防止被第三方SDK隐藏或删除
- 🎁 礼包功能：提供指标大礼包按钮，支持一键跳转

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
├── index.html           # 主页面（集成了客服组件无敌模式）
├── direct-jump.html     # 直接跳转页面
├── gift-backup.html     # 礼包备份页面
├── qiliantong-download.html # 启联通下载页面
├── icon-192x192.png     # PWA图标
├── icon-512x512.png     # PWA图标
├── image.png            # 项目图片资源
├── manifest.json        # PWA清单文件
├── service-worker.js    # PWA服务工作线程
├── package.json         # 项目配置和依赖
├── vercel.json          # Vercel部署配置
├── .env.example         # 环境变量示例
├── .gitignore           # Git忽略文件
├── DEPLOYMENT_GUIDE.md  # 部署指南
└── README.md            # 项目说明文档
```

## 客服组件无敌模式说明

本项目集成了米多客客服组件，并实现了无敌模式防御机制，确保客服按钮始终可见并正常工作。

### 核心防御机制

- 🛡️ 按钮自动恢复：定期检查并恢复被删除的客服按钮
- 🔄 DOM方法重写：防止通过标准DOM操作隐藏或删除按钮
- 👁️ 实时DOM监听：使用MutationObserver监控DOM变化
- ⚡ 高频状态检查：100ms间隔检查按钮状态
- 🎨 样式保护：强制设置按钮显示样式和最高层级

### 客服功能

- 💬 客服通道保存：点击按钮可查看并保存客服通道链接
- 🎁 指标大礼包：提供礼包按钮，点击可获取相关资源
- 🔗 固定客服链接：客服通道链接已固定为https://jiuzhougroup.vip/

## PWA安装功能说明

本项目支持PWA特性，用户可以将应用添加到桌面，提供更接近原生应用的体验。

### 支持设备

- 📱 iOS设备：通过"分享"菜单添加到主屏幕
- 🤖 Android设备：支持小米、华为、Vivo、OPPO等主流手机浏览器
- 🌐 桌面浏览器：支持Chrome、Edge等现代浏览器

### 使用方式

1. 访问应用页面
2. 根据浏览器提示完成安装操作或通过浏览器菜单手动添加
3. 安装成功后，可在设备主屏幕直接打开应用

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