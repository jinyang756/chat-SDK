// api/health.js - 健康检查端点
export default async function handler(req, res) {
    // 设置CORS头部
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // 返回健康状态
    return res.status(200).json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        message: 'Chat API is running normally',
        version: '1.0.0'
    });
}