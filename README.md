# 客服系统 SDK

## 项目简介

客服系统 SDK 是一个轻量级的客服聊天集成解决方案，提供智能体和人工客服无缝切换的功能，帮助网站快速集成在线客服系统。该 SDK 支持模拟模式，便于开发和测试环境使用。

## 目录结构

```
├── public/               # 静态资源目录
│   ├── index.html        # 主页面，嵌入客服窗口
│   ├── sw.js             # Service Worker 缓存控制
│   ├── visitor-identity-demo.html  # 访客身份演示页面
│   ├── assets/           # 图标、样式、字体等静态资源
│   └── js/               # JavaScript 代码
│       └── config.js     # 配置项
├── .env                 # 环境变量文件（不提交到版本控制）
├── .env.example         # 环境变量示例文件
├── .gitignore           # Git 忽略文件配置
├── build.js             # 构建脚本
├── package.json         # 项目配置和依赖
├── vercel.json          # Vercel 部署配置
└── README.md            # 项目说明文档
```

## 功能特性

- **智能体优先接待**：支持机器人优先接待客户，提升客服效率
- **人工客服转接**：当智能体无法解决问题时，支持无缝转人工客服
- **访客身份管理**：自动生成并保存访客 ID，提供个性化服务
- **多客服分组**：根据访客来源自动分配到不同的客服组
- **模拟模式**：支持本地模拟模式，便于开发和测试
- **实时消息通知**：提供直观的消息通知和状态反馈
- **响应式设计**：适配不同设备尺寸的屏幕

## 快速开始

### 环境变量配置

项目使用环境变量管理敏感信息，需要创建 `.env` 文件：

1. 复制 `.env.example` 文件并重命名为 `.env`
2. 在 `.env` 文件中填写必要的环境变量

```bash
# 复制环境变量示例文件
cp .env.example .env

# 编辑 .env 文件，设置必要的环境变量
# COZE_API_TOKEN=pat_********
```

### 安装依赖

```bash
# 安装项目依赖
npm install
```

### 构建和运行

```bash
# 构建项目（处理环境变量替换）
npm run build

# 启动开发服务器
npm run start
```

启动后，访问 [http://localhost:8080](http://localhost:8080) 即可查看客服系统演示页面。

## 配置说明

### 环境变量配置

项目使用以下环境变量进行配置：

- `COZE_API_TOKEN`：扣子智能体的API密钥（必填）
- `BOT_ID`：机器人ID（可选，默认为内置值）
- `SERVER_URL`：服务器地址（可选，默认为空表示不连接真实后端）

这些环境变量需要在 `.env` 文件中配置，构建过程会自动将它们注入到代码中。

### 应用配置

客服系统的主要配置位于 `public/js/config.js` 文件中：

```javascript
const CONFIG = {
  // 演示模式，前后端一体运行
  useMockMode: true,
  // 留空表示不连接真实后端
  serverUrl: ''
};
// 使其成为全局变量
window.CONFIG = CONFIG;
```

### 配置项说明

- `useMockMode`：是否使用模拟模式，建议开发和测试时设为true，生产环境设为false
- `serverUrl`：客服系统的服务端地址，用于连接WebSocket和加载客服界面（留空表示不连接真实后端）

## 部署指南

### 本地部署

1. 确保 `useMockMode` 设置为 `false`
2. 配置正确的 `serverUrl`
3. 使用静态文件服务器部署 `public` 目录

### Vercel 部署

项目已包含 `vercel.json` 配置文件，可以直接部署到 Vercel：

1. 登录 Vercel 账号
2. 导入项目仓库
3. Vercel 会自动识别配置并部署
4. 部署完成后，更新 `config.js` 中的 `serverUrl` 为您的 Vercel 域名

### 其他平台部署

可以部署到任何支持静态网站托管的平台，如 GitHub Pages、Netlify、Cloudflare Pages 等：

1. 确保 `public` 目录被正确识别为静态资源目录
2. 配置自定义域名（如果需要）
3. 更新 `config.js` 中的 `serverUrl` 为您的实际域名

## 开发说明

### 模块化架构

项目采用模块化架构，将不同功能拆分为独立的 JavaScript 模块：

- `config.js`：全局配置管理
- `visitor-identity.js`：访客身份和信息管理
- `websocket-client.js`：WebSocket 连接和消息处理
- `error-handler.js`：错误处理和用户通知

### 模拟模式

在模拟模式下，系统不会连接真实的服务器，而是使用本地模拟的 WebSocket 实现。这对于开发和测试非常有用。

模拟模式下，转人工客服请求会触发模拟的客服接入过程，并显示模拟的客服消息。

### 转人工客服功能

转人工客服功能通过以下流程实现：

1. 点击转人工客服按钮
2. 确认转人工请求
3. 系统发送转人工请求到服务器（或模拟处理）
4. 等待客服接入
5. 客服接入后，进行人工聊天

## 浏览器支持

- Chrome (推荐)
- Firefox
- Safari
- Edge
- IE 11 (部分功能可能受限)

## 环境变量配置

为了安全管理访问密钥，项目支持通过环境变量的方式配置扣子智能体的API访问密钥。

### 设置环境变量

1. 复制 `.env.example` 文件并重命名为 `.env`
   ```bash
   cp .env.example .env
   ```

2. 在 `.env` 文件中填写您的扣子智能体API访问密钥
   ```
   COZE_API_TOKEN=pat_********
   ```

3. 环境变量会在构建过程中自动注入到代码中

### 注意事项

- 不要将包含真实密钥的 `.env` 文件提交到版本控制系统
- 确保 `.gitignore` 文件中包含 `.env`
- 在开发环境和生产环境可以使用不同的 `.env` 文件
- 如需更多配置选项，可以在 `.env` 文件中添加自定义环境变量

## 配置说明

客服系统的主要配置位于 `public/js/config.js` 文件中：

```javascript
const CONFIG = {
  // 演示模式，前后端一体运行
  useMockMode: true,
  // 留空表示不连接真实后端
  serverUrl: ''
};
// 使其成为全局变量
window.CONFIG = CONFIG;
```

## 部署指南

### 本地部署

1. 确保 `useMockMode` 设置为 `false`
2. 配置正确的 `serverUrl`
3. 设置环境变量 COZE_API_TOKEN
4. 安装依赖
   ```bash
   npm install
   ```
5. 构建项目
   ```bash
   npm run build
   ```
6. 启动服务器
   ```bash
   npm run start
   ```

### Vercel 部署

项目已包含 `vercel.json` 配置文件，可以直接部署到 Vercel：

1. 登录 Vercel 账号
2. 导入项目仓库
3. 在 Vercel 项目设置中添加环境变量 `COZE_API_TOKEN`
4. Vercel 会自动识别配置并部署
5. 部署完成后，更新 `config.js` 中的 `serverUrl` 为您的 Vercel 域名

### 其他平台部署

可以部署到任何支持静态网站托管的平台，如 GitHub Pages、Netlify、Cloudflare Pages 等：

1. 确保 `public` 目录被正确识别为静态资源目录
2. 在平台的设置中添加环境变量 `COZE_API_TOKEN`
3. 配置自定义域名（如果需要）
4. 更新 `config.js` 中的 `serverUrl` 为您的实际域名

## 开发说明

### 模块化架构

项目采用模块化架构，将不同功能拆分为独立的 JavaScript 模块：

- `config.js`：全局配置管理
- `visitor-identity.js`：访客身份和信息管理
- `websocket-client.js`：WebSocket 连接和消息处理
- `error-handler.js`：错误处理和用户通知

### 模拟模式

在模拟模式下，系统不会连接真实的服务器，而是使用本地模拟的 WebSocket 实现。这对于开发和测试非常有用。

模拟模式下，转人工客服请求会触发模拟的客服接入过程，并显示模拟的客服消息。

### 转人工客服功能

转人工客服功能通过以下流程实现：

1. 点击转人工客服按钮
2. 确认转人工请求
3. 系统发送转人工请求到服务器（或模拟处理）
4. 等待客服接入
5. 客服接入后，进行人工聊天

## 浏览器支持

- Chrome (推荐)
- Firefox
- Safari
- Edge
- IE 11 (部分功能可能受限)

## 注意事项

- 在生产环境中，务必将 `useMockMode` 设置为 `false`
- 确保配置正确的 `serverUrl`，否则无法连接客服系统
- 当切换网络环境时，可能需要刷新页面以重新建立连接
- 如需自定义样式，可以修改 `index.html` 中的 CSS 样式
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