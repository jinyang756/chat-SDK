// api/test-coze.js - 测试扣子连接
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
        const { botId, accessToken, apiUrl } = req.body;

        if (!botId || !accessToken) {
            return res.status(400).json({ error: '缺少Bot ID或Access Token' });
        }

        // 发送测试请求
        const testResponse = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
                bot_id: botId,
                user_id: 'test_user_' + Date.now(),
                stream: false,
                auto_save_history: false,
                additional_messages: [
                    {
                        role: 'user',
                        content: 'hello',
                        content_type: 'text'
                    }
                ]
            })
        });

        if (testResponse.ok) {
            return res.status(200).json({ 
                success: true, 
                message: '连接测试成功' 
            });
        } else {
            const errorText = await testResponse.text();
            return res.status(400).json({ 
                success: false, 
                error: `连接测试失败: ${testResponse.status}`,
                details: errorText
            });
        }

    } catch (error) {
        console.error('测试连接错误:', error);
        return res.status(500).json({ 
            success: false,
            error: '测试连接时发生错误',
            details: error.message 
        });
    }
}