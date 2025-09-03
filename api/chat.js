// api/chat.js - 生产环境版本（使用环境变量）
export default async function handler(req, res) {
    // 设置CORS头部
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: '方法不允许' });
    }

    try {
        const { message } = req.body;
        
        // 优先使用环境变量，回退到请求体参数
        const botId = process.env.COZE_BOT_ID || req.body.botId;
        const accessToken = process.env.COZE_ACCESS_TOKEN || req.body.accessToken;
        const apiUrl = process.env.COZE_API_URL || req.body.apiUrl || 'https://api.coze.cn/v3/chat';

        if (!message) {
            return res.status(400).json({ error: '消息内容不能为空' });
        }

        if (!botId || !accessToken) {
            return res.status(400).json({ 
                error: '未配置Bot ID或Access Token',
                hint: '请在Vercel环境变量中设置COZE_BOT_ID和COZE_ACCESS_TOKEN，或通过界面配置'
            });
        }

        // 生成唯一用户ID
        const userId = 'web_user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6);

        // 构造扣子API请求
        const requestBody = {
            bot_id: botId,
            user_id: userId,
            stream: false,
            auto_save_history: true,
            additional_messages: [
                {
                    role: 'user',
                    content: message,
                    content_type: 'text'
                }
            ]
        };

        console.log('发送请求到扣子API:', {
            url: apiUrl,
            botId: botId.substring(0, 8) + '...',
            messageLength: message.length
        });

        const cozeResponse = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
                'User-Agent': 'CozeWebChat/1.0'
            },
            body: JSON.stringify(requestBody),
            timeout: 30000 // 30秒超时
        });

        const responseText = await cozeResponse.text();
        
        if (!cozeResponse.ok) {
            console.error('扣子API错误:', {
                status: cozeResponse.status,
                statusText: cozeResponse.statusText,
                response: responseText.substring(0, 500)
            });
            
            return res.status(cozeResponse.status).json({ 
                error: `扣子API调用失败 (${cozeResponse.status})`,
                details: cozeResponse.statusText,
                suggestion: '请检查Bot ID和Access Token是否正确'
            });
        }

        let cozeData;
        try {
            cozeData = JSON.parse(responseText);
        } catch (parseError) {
            console.error('JSON解析错误:', parseError);
            return res.status(500).json({ 
                error: 'API返回数据格式错误',
                details: 'JSON解析失败'
            });
        }

        // 处理扣子API返回的数据
        let reply = '抱歉，我暂时无法回答这个问题。';
        
        if (cozeData && cozeData.messages && Array.isArray(cozeData.messages)) {
            // 找到最后一个助手的回复
            const assistantMessages = cozeData.messages.filter(msg => msg.role === 'assistant');
            if (assistantMessages.length > 0) {
                const lastAssistantMessage = assistantMessages[assistantMessages.length - 1];
                if (lastAssistantMessage.content) {
                    reply = lastAssistantMessage.content;
                }
            }
        }

        // 记录成功的API调用
        console.log('扣子API调用成功:', {
            conversationId: cozeData?.conversation_id,
            messageCount: cozeData?.messages?.length || 0,
            replyLength: reply.length
        });

        return res.status(200).json({ 
            reply,
            conversation_id: cozeData?.conversation_id,
            message_id: cozeData?.id,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('API处理错误:', error);
        
        // 判断错误类型
        if (error.name === 'AbortError' || error.message.includes('timeout')) {
            return res.status(408).json({ 
                error: '请求超时',
                details: '请稍后重试',
                code: 'TIMEOUT'
            });
        }

        if (error.message.includes('fetch')) {
            return res.status(503).json({ 
                error: '网络连接错误',
                details: '无法连接到扣子服务器',
                code: 'NETWORK_ERROR'
            });
        }

        return res.status(500).json({ 
            error: '服务器内部错误',
            details: process.env.NODE_ENV === 'development' ? error.message : '请联系管理员',
            code: 'INTERNAL_ERROR'
        });
    }
}