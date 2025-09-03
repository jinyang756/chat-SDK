# 扣子智能体网站部署指南

## 📋 项目概述

这个项目可以让你轻松将扣子（Coze）上配置的智能体通过自定义域名直接访问，无需用户登录，支持一键部署到 Vercel。

## 🚀 快速部署

### 1. 准备工作

在开始之前，你需要：

- ✅ 扣子账号并已创建智能体
- ✅ GitHub 账号
- ✅ Vercel 账号（免费）

### 2. 获取扣子配置信息

#### 2.1 创建访问令牌
1. 登录 [扣子平台](https://www.coze.cn/)
2. 进入「个人中心」→「API管理」
3. 点击「创建新令牌」
4. 填写令牌名称，选择权限范围
5. 保存生成的 Access Token（重要：只显示一次）

#### 2.2 获取 Bot ID
1. 进入你的智能体页面
2. 点击右上角「发布」按钮
3. 选择「API」发布渠道
4. 复制显示的 Bot ID

### 3. 项目文件结构

创建以下文件结构：

```
your-project/
├── index.html          # 主页面（聊天界面）
├── api/
│   ├── chat.js         # 聊天API路由
│   └── test-coze.js    # 测试连接API
├── vercel.json         # Vercel配置文件
├── package.json        # 项目配置
└── README.md           # 说明文档
```

### 4. 部署步骤

#### 4.1 方式一：GitHub + Vercel（推荐）

1. **创建GitHub仓库**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/你的用户名/仓库名.git
   git push -u origin main
   ```

2. **连接Vercel**
   - 访问 [Vercel Dashboard](https://vercel.com/dashboard)
   - 点击「New Project」
   - 选择你的GitHub仓库
   - 点击「Deploy」

3. **配置自定义域名**（可选）
   - 在Vercel项目设置中添加自定义域名
   - 按照提示配置DNS记录

#### 4.2 方式二：直接从本地部署

1. **安装Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **登录并部署**
   ```bash
   vercel login
   vercel --prod
   ```

### 5. 使用说明

#### 5.1 首次配置
1. 访问部署好的网站
2. 点击右上角的⚙️配置按钮
3. 填入你的Bot ID和Access Token
4. 点击「测试连接」确保配置正确
5. 保存配置

#### 5.2 配置参数说明

| 参数 | 说明 | 获取方式 |
|------|------|----------|
| Bot ID | 智能体唯一标识 | 扣子平台→智能体→发布→API |
| Access Token | 访问令牌 | 扣子平台→个人中心→API管理 |
| API URL | 接口地址 | 默认：`https://api.coze.cn/v3/chat` |

### 6. 功能特性

- ✨ **现代化UI设计**：响应式布局，支持移动端
- 🔐 **安全配置**：Token加密存储，安全可靠
- ⚡ **实时对话**：流畅的对话体验
- 🎨 **可定制外观**：易于修改样式和品牌元素
- 📱 **跨平台支持**：支持所有现代浏览器

### 7. 自定义配置

#### 7.1 修改外观
编辑 `index.html` 中的CSS样式：

```css
/* 修改主题色 */
:root {
    --primary-color: #667eea;
    --secondary-color: #764ba2;
}

/* 修改网站标题 */
.header h1 {
    /* 你的样式 */
}
```

#### 7.2 添加自定义功能
在JavaScript部分添加你的功能逻辑：

```javascript
// 例：添加快捷回复
const quickReplies = [
    "你好",
    "帮助",
    "联系客服"
];
```

### 8. 故障排除

#### 8.1 常见问题

**Q: 配置保存后仍显示连接失败？**
A: 检查Bot ID和Access Token是否正确，确保智能体已发布为API

**Q: 消息发送后没有回复？**
A: 检查浏览器开发者工具的网络面板，查看API调用是否成功

**Q: 部署后页面显示404？**
A: 确保vercel.json配置正确，重新部署项目

#### 8.2 调试技巧

1. **查看控制台日志**
   ```javascript
   // 在浏览器开发者工具中查看错误信息
   console.log('调试信息');
   ```

2. **API调用测试**
   ```bash
   # 使用curl测试API
   curl -X POST https://你的域名.vercel.app/api/test-coze \
   -H "Content-Type: application/json" \
   -d '{"botId":"your-bot-id","accessToken":"your-token"}'
   ```

### 9. 高级配置

#### 9.1 环境变量（推荐用于生产）

在Vercel Dashboard中设置环境变量：

```
COZE_BOT_ID=你的Bot ID
COZE_ACCESS_TOKEN=你的Access Token
COZE_API_URL=https://api.coze.cn/v3/chat
```

然后修改API代码使用环境变量：

```javascript
const botId = process.env.COZE_BOT_ID || req.body.botId;
const accessToken = process.env.COZE_ACCESS_TOKEN || req.body.accessToken;
```

#### 9.2 添加用户分析

集成Google Analytics或其他分析工具：

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### 10. 更新和维护

#### 10.1 更新代码
```bash
git add .
git commit -m "更新说明"
git push
# Vercel会自动重新部署
```

#### 10.2 监控和日志
- 在Vercel Dashboard查看部署状态
- 使用Functions标签页查看API调用日志
- 设置性能监控和错误报告

### 11. 安全建议

1. **不要在前端暴露敏感信息**
2. **定期轮换Access Token**  
3. **设置适当的CORS策略**
4. **监控API使用量，防止滥用**

### 12. 成本考虑

- **Vercel免费套餐**：
  - 每月100GB带宽
  - 无限静态托管
  - Serverless Functions调用限制

- **扣子API**：
  - 根据实际调用量计费
  - 查看扣子官网最新定价

### 13. 技术支持

如果遇到问题，可以：

1. 查看项目GitHub Issues
2. 参考扣子官方文档
3. 访问Vercel支持文档
4. 加入相关技术社区

---

## 🎉 部署完成！

现在你就拥有了一个完全自主的AI聊天网站，用户可以直接通过你的域名访问，无需注册或登录，享受流畅的AI对话体验！