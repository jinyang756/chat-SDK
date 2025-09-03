// api/chat.js - Vercel API路由
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
        const { message, botId, accessToken, apiUrl, conversationId } = req.body;

        if (!message || !botId || !accessToken) {
            return res.status(400).json({ error: '缺少必要参数' });
        }

        // 构造扣子API请求
        const cozeResponse = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
                bot_id: botId,
                user_id: 'user_' + Date.now(),
                stream: false,
                auto_save_history: true,
                additional_messages: [
                    {
                        role: 'user',
                        content: message,
                        content_type: 'text'
                    }
                ]
            })
        });

        if (!cozeResponse.ok) {
            const errorText = await cozeResponse.text();
            console.error('扣子API错误:', errorText);
            return res.status(cozeResponse.status).json({ 
                error: `扣子API调用失败: ${cozeResponse.status}`,
                details: errorText 
            });
        }

        const cozeData = await cozeResponse.json();
        
        // 处理扣子API返回的数据
        let reply = '抱歉，我暂时无法回答这个问题。';
        
        if (cozeData.messages && cozeData.messages.length > 0) {
            // 找到助手的回复
            const assistantMessage = cozeData.messages.find(msg => msg.role === 'assistant');
            if (assistantMessage && assistantMessage.content) {
                reply = assistantMessage.content;
            }
        }

        return res.status(200).json({ 
            reply,
            conversation_id: cozeData.conversation_id || conversationId
        });

    } catch (error) {
        console.error('API错误:', error);
        return res.status(500).json({ 
            error: '服务器内部错误',
            details: error.message 
        });
    }
}