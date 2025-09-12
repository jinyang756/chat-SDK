# 米多客openUrl方法详解：参数、用法与实战指南

### 米多客 openUrl 方法详解：参数、用法与实战指南

#### 一、方法定位与核心作用

`openUrl` 是米多客客服系统 SDK 提供的 **页面跳转专属 API**，用于在侧边栏或新标签页中安全加载 URL 资源。相较于原生的 `window.location.href` 跳转，它能解决两大核心问题：



1.  维持米多客侧边栏环境的完整性，避免跳转后 SDK 连接中断

2.  提供跨域跳转支持（需配置白名单），突破浏览器同源策略限制

该方法通过 `window._MICHAT('openUrl', { ... })` 格式调用，所有参数通过 JSON 对象传递，确保在米多客复杂的嵌入环境中稳定运行。

#### 二、完整参数说明与配置规范



| 参数名           | 类型      | 是否必需 | 功能说明                                               |
| ------------- | ------- | ---- | -------------------------------------------------- |
| `url`         | String  | 是    | 目标页面 URL，必须包含完整协议（`http://`或`https://`），同域时可使用相对路径 |
| `type`        | String  | 否    | 跳转方式：`sidebar`（侧边栏内打开，默认）/`newTab`（新标签页打开）         |
| `crossDomain` | Boolean | 否    | 是否开启跨域模式，`true`需配合`whitelist`参数使用                  |
| `whitelist`   | String  | 否    | 跨域白名单域名（如`https://cdn.yourcompany.com`），需与后台配置一致   |

##### 关键参数详解：



1.  `url`**格式要求**

    必须符合 URL 规范，包含协议头（避免`unknown protocol`错误）。例如：

    ✅ 正确：`https://kefu.yourcompany.com/widget.html`

    ❌ 错误：`//``kefu.yourcompany.com/widget.html`（缺少协议）

2.  `type`**场景选择**

*   侧边栏内功能跳转（如从数据概览到详情页）用 `type: 'sidebar'`

*   需要脱离侧边栏的独立操作（如下载文件）用 `type: 'newTab'`

1.  **跨域配置规则**

    当 `crossDomain: true` 时，`whitelist` 必须填写与米多客主域不同的目标域名，且该域名需提前在米多客管理后台「开发者设置 - 跨域白名单」中登记。

#### 三、实战代码示例（覆盖主流场景）

##### 场景 1：同域侧边栏内跳转



```
// 主页面：https://kefu.yourcompany.com/main.html

// 挂件页面与主页面同域，相对路径跳转

window.\_MICHAT('openUrl', {

&#x20; url: './widgets/analysis.html', // 相对路径需保证目录关系正确

&#x20; type: 'sidebar'

});
```

##### 场景 2：跨域资源加载（CDN 静态页面）



```
// 主页面：https://kefu.yourcompany.com/main.html

// 挂件页面部署在CDN（不同域）

window.\_MICHAT('openUrl', {

&#x20; url: 'https://cdn.yourcompany.com/midok/report.html',

&#x20; type: 'sidebar',

&#x20; crossDomain: true,

&#x20; whitelist: 'https://cdn.yourcompany.com' // 需与后台白名单完全一致

});
```

##### 场景 3：新标签页打开外部链接



```
// 打开帮助中心（新标签页不影响侧边栏环境）

window.\_MICHAT('openUrl', {

&#x20; url: 'https://help.yourcompany.com/kefu-guide.html',

&#x20; type: 'newTab' // 新标签页无需跨域配置

});
```

#### 四、常见错误与排查方案



| 错误现象                     | 底层原因              | 解决方法                                                |
| ------------------------ | ----------------- | --------------------------------------------------- |
| 跳转无响应                    | URL 协议缺失或域名拼写错误   | 检查`url`是否包含`https://`，用`ping`命令验证域名有效性              |
| 控制台报跨域错误                 | 未配置跨域白名单或参数不匹配    | 1. 在米多客后台添加`whitelist`域名2. 确保`crossDomain: true`已设置 |
| 跳转后侧边栏空白                 | URL 路径错误或资源未部署    | 直接在浏览器访问目标 URL，确认返回 200 状态码                         |
| `_MICHAT is not defined` | 调用时机过早（SDK 未加载完成） | 包裹在`midokSdkReady`事件监听中执行（参考之前模板的初始化逻辑）             |

#### 五、与原生跳转方式的对比优势



| 特性      | `openUrl`方法      | 原生`window.location` |
| ------- | ---------------- | ------------------- |
| 侧边栏环境维持 | 保持 SDK 连接，支持后续交互 | 会中断米多客环境，丢失上下文      |
| 跨域支持    | 支持配置白名单的跨域跳转     | 受浏览器同源策略严格限制        |
| 跳转控制    | 可指定在侧边栏 / 新标签页打开 | 只能在当前窗口跳转           |
| 错误处理    | 内置异常捕获机制         | 需要手动处理所有错误场景        |

> ⚠️ 特别注意：米多客生成的聊天链接（如
>
> `chatlink.html`
>
> ）也需通过
>
> `openUrl`
>
> 加载，若直接使用
>
> `iframe`
>
> 嵌入可能导致会话状态丢失。建议部署在同域目录下，通过相对路径调用实现无缝跳转。

> （注：文档部分内容可能由 AI 生成）