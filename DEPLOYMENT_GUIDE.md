# Vercel 项目部署指南

## 域名转移指南

本指南将帮助您将已有的 `jiuzhougroup.vip` 域名从其他 Vercel 项目转移到当前的 chat SDK 项目。

### 前提条件
- 您需要拥有 Vercel 账户的管理权限
- 您需要是 `jiuzhougroup.vip` 域名的所有者或具有管理权限

### 问题说明

根据命令行输出，目前遇到的问题是：`You don't have access to the domain jiuzhougroup.vip under kims-projects-005a1207.`

这表明当前账户(kims-projects-005a1207)没有访问或管理 `jiuzhougroup.vip` 域名的权限。要解决这个问题，需要通过 Vercel 控制面板进行操作。

### 方法一：通过 Vercel 控制面板进行域名转移

这是最直接和推荐的方法：

1. 登录 [Vercel 控制面板](https://vercel.com/dashboard)
2. 确保您已切换到包含 `jiuzhougroup.vip` 域名的 Vercel Team 或个人账户
3. 在顶部导航栏中，点击您的头像，选择 **Settings**
4. 在左侧菜单中，选择 **Domains**
5. 在域名列表中找到 `jiuzhougroup.vip`
6. 点击域名右侧的 **...** 图标，选择 **Transfer to Project**
7. 在弹出的对话框中，选择您的 chat SDK 项目（kims-projects-005a1207/coze-chat-app）
8. 点击 **Transfer** 按钮完成转移

### 方法二：从原项目移除并重新添加

如果方法一不可用，可以尝试这个方法：

#### 步骤 1: 从原项目中彻底移除域名

1. 登录 [Vercel 控制面板](https://vercel.com/dashboard)，使用包含 `jiuzhougroup.vip` 域名的账户
2. 在左侧导航栏中，点击原项目名称进入项目详情页
3. 点击顶部导航栏的 **Settings** 选项卡
4. 在左侧菜单中，选择 **Domains**
5. 在域名列表中找到 `jiuzhougroup.vip`
6. 点击域名右侧的 **...** 图标，选择 **Remove**
7. 确认移除操作
8. 等待几分钟，让系统完全处理移除请求

#### 步骤 2: 将域名添加到当前项目

1. 使用当前账户（kims-projects-005a1207）登录 Vercel 控制面板
2. 在 Vercel 控制面板中，导航到当前的 chat SDK 项目
3. 点击顶部导航栏的 **Settings** 选项卡
4. 在左侧菜单中，选择 **Domains**
5. 在 **Add a Domain** 输入框中，输入 `jiuzhougroup.vip`
6. 点击 **Add** 按钮
7. 按照提示完成域名所有权验证
   - 通常需要在域名注册商处添加 TXT 记录或 CNAME 记录
   - 验证完成后，Vercel 会自动配置 SSL 证书

### 步骤 3: 验证域名配置

1. 域名添加成功后，等待 DNS 记录生效（通常需要几分钟到几小时）
2. 尝试在浏览器中访问 `https://jiuzhougroup.vip`，应该能看到您的 chat SDK 项目

### 额外选项：设置默认别名

如果您希望 `jiuzhougroup.vip` 始终指向最新的生产环境部署，可以设置为默认别名：

1. 确保您的项目已经有一个生产环境部署
2. 在项目的 Domains 设置页面中，点击 `jiuzhougroup.vip` 域名
3. 启用 **Use as Production Branch** 选项

### 常见问题排查

- **域名访问权限错误**：确保您使用的 Vercel 账户有权限管理 `jiuzhougroup.vip` 域名
- **域名已分配错误**：确保域名已从原项目中彻底移除，等待几分钟后再尝试添加
- **DNS 解析失败**：确保您的域名注册商的 DNS 记录已正确配置并生效
- **SSL 证书错误**：Vercel 会自动为添加的域名配置 SSL 证书，如有问题，等待几分钟后刷新页面

### 命令行备选方案

命令行方法目前受限，因为需要先通过控制面板验证域名所有权。建议使用上述控制面板方法完成配置。

## 关于平台错误消息

部署到Vercel平台后，您可能会在浏览器控制台看到以下错误消息：

```
net::ERR_ABORTED https://your-deployment-url/.well-known/vercel-user-meta
https://cdn.cr-relay.com/v1/site/*/signals.js
[GSI_LOGGER]: FedCM get() rejects with NetworkError: Error retrieving a token.
net::ERR_ABORTED https://vercel.com/hfi/vitals
```

### 这些错误是正常的！

这些错误消息**不会影响聊天应用的核心功能**，它们是Vercel平台的正常行为，包括：

1. **vercel-user-meta** - Vercel用户元数据请求，用于平台功能
2. **signals.js** - Vercel的性能监控脚本
3. **GSI_LOGGER** - Google服务集成相关，与Vercel的某些功能有关
4. **vercel.com/hfi/vitals** - Vercel的健康监控和指标收集

这些都是Vercel平台级别的请求，不是由我们的应用代码发起的。即使这些请求失败，您的聊天应用仍然可以正常工作。

## 验证应用功能

要验证聊天应用是否正常工作，请使用以下方法：

1. **健康检查API** - 访问 `/api/health` 端点，应该返回状态为'ok'的JSON响应
2. **测试连接功能** - 使用页面上的设置按钮，填写Bot ID和Access Token，然后点击"测试连接"按钮
3. **发送测试消息** - 在聊天界面发送一条消息，看是否能正常获得回复

## 环境变量配置

在Vercel平台部署时，请确保在项目设置中配置以下环境变量：

- `COZE_BOT_ID` - 您的扣子Bot ID
- `COZE_ACCESS_TOKEN` - 您的扣子访问令牌
- `COZE_API_URL` - 扣子API URL（默认为 `https://api.coze.cn/v3/chat`）
- `NODE_ENV` - 设置为 `production`

## 本地开发

本地开发时，您可以：

1. 创建一个 `.env` 文件，复制 `.env.example` 的内容并填写实际值
2. 通过URL参数传递配置：`?botId=your-bot-id&accessToken=your-access-token`
3. 使用界面上的设置功能来配置Bot ID和Access Token

## 常见问题排查

1. **聊天无响应**
   - 检查Bot ID和Access Token是否正确配置
   - 使用"测试连接"功能验证API连接是否正常
   - 检查浏览器控制台是否有其他错误（非Vercel平台相关的）

2. **API请求失败**
   - 确认您的Access Token是否有效且未过期
   - 检查CORS设置是否正确
   - 查看Vercel日志获取详细错误信息

3. **页面加载缓慢**
   - 这可能是由于CDN资源加载延迟导致的
   - 尝试刷新页面或清除浏览器缓存

## 部署到生产环境

使用以下命令将应用部署到Vercel生产环境：

```bash
vercel --prod
```

部署成功后，您的应用将可在生产域名上访问。

## GitHub 与 Vercel 自动部署配置

由于您已经将 Vercel 项目链接到了 GitHub 仓库，您可以通过以下方式实现代码更新后的自动部署：

### 自动部署工作原理

当您将代码推送到 GitHub 仓库时，Vercel 会自动检测变更并触发部署流程，无需手动运行 `vercel` 命令。

### 自动部署配置步骤

您的 Vercel 项目已经与 GitHub 仓库链接，通常情况下不需要额外配置即可享受自动部署功能。不过，您可以根据需要进行以下配置：

1. 登录 [Vercel 控制面板](https://vercel.com/dashboard)
2. 导航到您的 chat SDK 项目（kims-projects-005a1207/coze-chat-app）
3. 点击顶部导航栏的 **Settings** 选项卡
4. 在左侧菜单中，选择 **Git**
5. 在这里您可以配置：
   - **Production Branch**：设置哪个分支的推送会触发生产环境部署（通常是 `main` 或 `master`）
   - **Preview Branch**：设置哪些分支的推送会触发预览环境部署
   - **Ignored Build Step**：配置何时跳过构建（例如基于提交消息）
   - **Automatic Deployments**：启用或禁用自动部署

### 工作流程建议

为了保持代码质量和部署稳定性，建议采用以下工作流程：

1. **开发流程**：
   - 在本地创建功能分支进行开发
   - 提交代码并推送到 GitHub 上对应的功能分支
   - Vercel 会自动为该分支创建预览部署
   - 在预览环境测试功能

2. **发布流程**：
   - 功能测试通过后，合并到主分支（main/master）
   - 推送到 GitHub 主分支
   - Vercel 自动触发生产环境部署
   - 监控部署状态确保成功

### 自动部署的优势

- **减少手动操作**：无需每次更新都运行部署命令
- **提高发布频率**：可以更频繁地发布小的改进
- **降低人为错误**：自动化流程减少手动操作带来的错误
- **更快的反馈循环**：代码变更后立即可以看到效果

## 安全提示

- 不要在代码中硬编码Access Token等敏感信息
- 使用环境变量或安全的配置管理方式
- 定期更新您的Access Token以确保安全性
- 限制API的访问权限，只授予必要的权限