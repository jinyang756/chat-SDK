const CONFIG = {
  // 使用真实API调用模式
  useMockMode: false,
  // 从环境变量获取服务器URL
  serverUrl: window.ENV_CONFIG?.SERVER_URL || ''
};
// 使其成为全局变量
window.CONFIG = CONFIG;