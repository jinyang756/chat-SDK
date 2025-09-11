# 客服系统

一个集成米多客客服组件无敌模式的专业客服系统，支持一键部署到Vercel，提供稳定可靠的客户服务通道。

## 特性

- 🚀 快速部署：支持一键部署到Vercel，无需复杂配置
- 🛡️ 客服组件无敌模式：多重防御机制确保客服按钮始终可见，防止被第三方SDK隐藏或删除
- 🎁 礼包功能：提供指标大礼包按钮，支持一键跳转获取资源
- 🎨 视觉优化：手机容器采用半透明悬浮设计，毛玻璃效果提升用户体验
- 📱 响应式设计：完美适配桌面端和移动端，提供一致的用户体验

## 一键部署到Vercel

点击下方按钮，一键部署到您的Vercel账户：

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/service-app)

### 部署步骤

1. 点击上方"Deploy with Vercel"按钮
2. 登录您的Vercel账户
3. 点击"Deploy"按钮，等待部署完成
4. 部署完成后，您将获得一个可访问的URL

## 本地开发

### 前置要求

- Node.js (>=18.0.0)
- 任意HTTP服务器工具（如npx http-server、live-server等）

### 环境变量配置

1. 复制 `.env.example` 文件并重命名为 `.env`
2. 根据需要填写以下环境变量：

```
COZE_BOT_ID=你的BotID
COZE_ACCESS_TOKEN=你的AccessToken
COZE_API_URL=https://api.coze.cn/v3/chat

# 应用环境
NODE_ENV=production
```

> 注意：在Vercel部署时，这些环境变量需要在Vercel项目设置中配置，而不是通过.env文件
> 具体步骤：Vercel项目 -> Settings -> Environment Variables

### 启动方法

使用任意HTTP服务器工具启动项目：

```bash
npx http-server -p 8081
```

或使用项目中提供的server.js文件：

```bash
node server.js
```

然后打开浏览器访问 `http://localhost:8081`

## 项目结构

```
├── index.html           # 主页面（集成了客服组件无敌模式和手机容器优化）
├── direct-jump.html     # 直接跳转页面
├── gift-backup.html     # 礼包备份页面
├── qiliantong-download.html # 启联通下载页面
├── image.png            # 项目图片资源
├── .env.example         # 环境变量示例文件
├── package.json         # 项目配置
├── vercel.json          # Vercel部署配置
├── .gitignore           # Git忽略文件
├── DEPLOYMENT_GUIDE.md  # 部署指南
├── README.md            # 项目说明文档
├── server.js            # 简易HTTP服务器（本地开发用）
└── api/                 # API相关文件
    ├── chat.js          # 聊天API
    ├── health.js        # 健康检查API
    └── vercel-api-test.js # Vercel API测试
```

## 客服组件无敌模式说明

本项目集成了米多客客服组件，并实现了无敌模式防御机制，确保客服按钮始终可见并正常工作。

### 核心防御机制

- 🛡️ 组件自动恢复：定期检查并恢复被删除的客服按钮和手机容器
- 🔄 DOM方法重写：防止通过标准DOM操作隐藏、删除或修改按钮和容器样式
- 👁️ 实时DOM监听：使用MutationObserver监控DOM变化，即时响应修改尝试
- ⚡ 高频状态检查：100ms间隔检查所有组件状态，确保正常显示
- 🎨 样式保护：强制设置按钮和容器的显示样式、最高层级和半透明悬浮效果
- 📱 手机容器防御：特别保护半透明悬浮设计和毛玻璃效果不被覆盖

### 客服功能

- 💬 客服通道保存：点击按钮可查看并保存客服通道链接
- 🎁 指标大礼包：提供礼包按钮，点击可获取相关资源
- 🔗 固定客服链接：客服通道链接已固定为https://jiuzhougroup.vip/

## 许可证

本项目采用MIT许可证。