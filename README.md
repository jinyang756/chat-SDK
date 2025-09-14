# OnlineChat侧边栏挂件项目

本项目是一个基于米多客侧边栏样式的客服挂件，但已替换底层逻辑为调用OnlineChat客服系统，提供了完整的侧边栏适配方案，支持响应式布局和现代化的客服交互体验。

## 项目简介

本项目保留了米多客侧边栏的视觉风格，但将底层客服系统替换为OnlineChat，实现了：

- ✅ 符合米多客侧边栏适配格式要求
- ✅ 使用iframe嵌入OnlineChat客服窗口
- ✅ 响应式设计，适配不同尺寸的设备
- ✅ 保留原有侧边栏功能（指标大礼包、保存通道等）
- ✅ 完全脱离米多客，支持商用、可控、安全

## 核心功能

- OnlineChat客服面板（嵌入式）
- 指标大礼包功能（文件下载）
- 保存通道功能
- 响应式布局适配
- 随机访客ID生成与记忆

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

### OnlineChat服务器配置

在 `index.html` 文件中，您需要修改以下代码来配置您的OnlineChat服务器地址：

```javascript
// 获取OnlineChat客服URL
function getOnlineChatUrl(visitorId) {
    // 这里可以根据需要配置您的OnlineChat服务器地址
    // 注意：实际部署时需要替换为您自己的OnlineChat服务地址
    // 以下是一个示例地址，实际使用时请替换为有效的OnlineChat服务地址
    // 如果使用iframe嵌入遇到跨域问题，可以考虑使用window.open的方式
    return 'https://example-chat-service.com/chat?uid=' + visitorId;
}
```

将 `https://example-chat-service.com/chat` 替换为您实际的OnlineChat服务地址。

### 客服窗口打开方式配置

项目支持两种客服窗口打开方式，可以在 `index.html` 文件中配置：

```javascript
// 客服配置选项
const chatConfig = {
    // 选择客服窗口的打开方式: 'iframe' 或 'window'
    // 如果遇到跨域问题，建议使用 'window' 方式
    openMethod: 'iframe' // 可选值: 'iframe', 'window'
};
```

- **iframe方式**（默认）：在侧边栏面板中直接嵌入客服窗口
- **window方式**：在新窗口中打开客服页面，可有效避免跨域限制

### 文件结构说明

- `index.html` - 主页面，包含侧边栏基础结构和功能按钮
- `qiliantong-download.html` - 指标大礼包页面
- `package.json` - 项目配置和脚本定义
- `vercel.json` - Vercel部署配置文件
- `.gitignore` - Git忽略规则

## 功能实现说明

### 1. 客服面板功能

- 点击右下角客服按钮展开功能菜单
- 点击"在线客服"按钮打开客服窗口
- 支持两种客服窗口打开方式：
  - iframe嵌入：在侧边栏面板中直接显示客服窗口（默认）
  - 新窗口打开：在独立浏览器窗口中打开客服页面（避免跨域限制）
- 支持关闭面板和返回功能
- 自动生成并记忆访客ID，确保会话连续性

### 2. 指标大礼包功能

- 点击"指标大礼包"按钮打开下载页面
- 下载页面提供多种行业报告和数据指标下载
- 支持返回客服面板功能

### 3. 保存通道功能

- 点击"保存通道"按钮可以保存当前访问信息
- 目前使用alert提示，可根据需求扩展实际功能

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

1. 确保OnlineChat服务地址正确配置，否则无法正常加载客服窗口
2. 如需在生产环境使用，请替换示例中的模拟下载链接为真实的文件地址
3. 响应式设计支持移动端和桌面端，但在小屏幕设备上可能需要调整部分样式
4. 项目使用了Font Awesome图标库，确保网络连接正常以加载图标

## 许可证

本项目采用MIT许可证 - 详见LICENSE文件