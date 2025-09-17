/**
 * 扣子智能体交互模块
 * 处理智能体卡片点击事件和会话启动逻辑
 */

// 定义全局agentModule对象
window.agentModule = window.agentModule || {};

// 初始化扣子智能体配置
function initCozeConfig() {
    // 确保环境配置对象存在
    window.ENV_CONFIG = window.ENV_CONFIG || {
        COZE_API_TOKEN: '', // 不再硬编码Token，由环境变量提供
        BOT_ID: '7549806268429844490',
        SERVER_URL: ''
    };
}

// 启动扣子智能体会话
function startAgentChat(agentId) {
    initCozeConfig();
    
    console.log('启动扣子智能体会话，agentId:', agentId);
    console.log('使用的配置:', window.ENV_CONFIG);
    
    // 根据agentId选择不同的扣子智能体ID
    let cozeBotId = window.ENV_CONFIG.BOT_ID;
    if (agentId === 2) {
        // 如果是第二个智能体，可以使用不同的BOT_ID（如果有多个的话）
        // cozeBotId = '另一个智能体的BOT_ID';
    }
    
    try {
        // 检查是否有服务器URL配置，如果有则使用后端代理
        if (window.ENV_CONFIG.SERVER_URL) {
            // 获取访客ID和设备信息
            const visitorId = window.generateVisitorId ? window.generateVisitorId() : 'unknown';
            const deviceInfo = window.getDeviceInfo ? window.getDeviceInfo() : '';
            
            // 构建后端代理URL
            const chatUrl = `${window.ENV_CONFIG.SERVER_URL}/chat-proxy?bot_id=${cozeBotId}&agent_id=${agentId}&visitor_id=${visitorId}&device_info=${deviceInfo}`;
            
            // 创建一个新的对话框
            const chatWindow = window.open(chatUrl, '_blank', 'width=800,height=600,toolbar=no,location=no,status=no,menubar=no,scrollbars=yes');
            
            if (!chatWindow) {
                // 如果弹窗被阻止，提供备用方案
                showFallbackOption(chatUrl);
            }
        } else {
            // 仍然使用直接的iframe嵌入方式（但不再在URL中传递Token）
            createChatWindow(cozeBotId);
        }
    } catch (error) {
        console.error('启动智能体会话失败:', error);
        
        // 使用showNotification替代alert
        if (window.showNotification) {
            window.showNotification('智能体会话启动失败，请稍后重试', 'error');
        } else {
            alert('智能体会话启动失败，请稍后重试');
        }
    }
}

// 创建聊天窗口
function createChatWindow(cozeBotId) {
    try {
        const chatWindow = window.open('', '_blank', 'width=800,height=600,toolbar=no,location=no,status=no,menubar=no,scrollbars=yes');
        
        if (chatWindow) {
            // 构建扣子智能体的iframe HTML内容
            const iframeHtml = `
                <!DOCTYPE html>
                <html lang="zh-CN">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>扣子智能体 - 日斗投资助手</title>
                    <style>
                        body, html { margin: 0; padding: 0; height: 100%; overflow: hidden; }
                        iframe { width: 100%; height: 100%; border: 0; }
                    </style>
                </head>
                <body>
                    <iframe src="https://www.coze.cn/s/${cozeBotId}?embedded=true" allow="camera;microphone"></iframe>
                </body>
                </html>
            `;
            
            // 写入内容到新窗口
            chatWindow.document.write(iframeHtml);
            chatWindow.document.close();
        } else {
            // 如果弹窗被阻止，提供备用方案
            showFallbackOption(`https://www.coze.cn/s/${cozeBotId}`);
        }
    } catch (error) {
        console.error('创建聊天窗口失败:', error);
        throw error;
    }
}

// 显示备用选项
function showFallbackOption(chatUrl) {
    // 创建一个可点击的对话框替代alert
    const fallbackDialog = document.createElement('div');
    fallbackDialog.className = 'fallback-dialog';
    fallbackDialog.innerHTML = `
        <div class="fallback-content">
            <h3>弹窗被阻止</h3>
            <p>请允许弹出窗口，或点击下方按钮访问智能体：</p>
            <a href="${chatUrl}" target="_blank" class="fallback-button">打开智能体对话</a>
            <button class="fallback-close">关闭</button>
        </div>
    `;
    
    // 添加样式
    const style = document.createElement('style');
    style.textContent = `
        .fallback-dialog {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        }
        .fallback-content {
            background-color: white;
            padding: 20px;
            border-radius: 8px;
            max-width: 400px;
            width: 90%;
            text-align: center;
        }
        .fallback-button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #3c6382;
            color: white;
            text-decoration: none;
            border-radius: 4px;
            margin: 10px 0;
        }
        .fallback-close {
            padding: 8px 16px;
            background-color: #f5f5f5;
            border: 1px solid #ddd;
            border-radius: 4px;
            cursor: pointer;
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(fallbackDialog);
    
    // 添加关闭事件
    fallbackDialog.querySelector('.fallback-close').addEventListener('click', () => {
        fallbackDialog.remove();
        style.remove();
    });
}

// 初始化智能体卡片事件监听
function initAgentCards() {
    document.addEventListener('DOMContentLoaded', function() {
        const card1 = document.getElementById('agentCard1');
        const card2 = document.getElementById('agentCard2');
        
        if (card1) {
            card1.addEventListener('click', () => startAgentChat(1));
        }
        
        if (card2) {
            card2.addEventListener('click', () => startAgentChat(2));
        }
    });
}

// 注册Service Worker
function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js').then(registration => {
                console.log('ServiceWorker registration successful with scope:', registration.scope);
            }).catch(registrationError => {
                console.log('ServiceWorker registration failed:', registrationError);
            });
        });
    }
}

// 暴露公共API
window.agentModule = {
    init: function() {
        initAgentCards();
        registerServiceWorker();
    },
    startAgentChat: startAgentChat,
    initCozeConfig: initCozeConfig
};