// 生成或获取访客ID
function generateVisitorId() {
  // 尝试从localStorage获取已有的访客ID
  let visitorId = localStorage.getItem('onlineChatVisitorId');
  if (!visitorId) {
    // 生成新的访客ID
    visitorId = 'visitor_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('onlineChatVisitorId', visitorId);
  }
  return visitorId;
}

// 根据访客来源获取客服分组
function getCustomerServiceGroup() {
  // 获取当前页面路径和参数
  const path = window.location.pathname;
  const searchParams = new URLSearchParams(window.location.search);
  
  // 从URL参数中获取分组信息
  const groupParam = searchParams.get('group');
  if (groupParam) {
    return groupParam;
  }
  
  // 根据页面路径智能分配
  if (path.includes('product') || path.includes('buy')) {
    return 'shouqian'; // 售前客服
  } else if (path.includes('support') || path.includes('help')) {
    return 'shouhou'; // 售后客服
  } else if (path.includes('tech') || path.includes('api')) {
    return 'tech'; // 技术支持
  } else {
    return 'default'; // 默认客服组
  }
}

// 获取设备信息
function getDeviceInfo() {
  const deviceInfo = {
    isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
    browser: navigator.userAgent,
    language: navigator.language || navigator.userLanguage,
    screenWidth: window.screen.width,
    screenHeight: window.screen.height
  };
  return encodeURIComponent(JSON.stringify(deviceInfo));
}

// 获取客服URL
function getChatUrl() {
  const visitorId = generateVisitorId();
  const groupId = getCustomerServiceGroup();
  const deviceInfo = getDeviceInfo();
  const timestamp = Date.now();
  
  // 检查是否使用模拟模式
  if (window.CONFIG && window.CONFIG.useMockMode) {
    // 在模拟模式下，返回本地演示页面的URL
    return 'visitor-identity-demo.html?uid=' + visitorId + '&group_id=' + groupId;
  }
  
  // 非模拟模式下的真实URL构建
  if (window.CONFIG && !window.CONFIG.serverUrl) {
    console.error('serverUrl未配置，无法获取客服URL');
    return '';
  }
  
  // 构建URL参数，确保不会出现重复的斜杠，支持机器人优先接待
  if (window.CONFIG && window.CONFIG.serverUrl) {
    const baseUrl = window.CONFIG.serverUrl.endsWith('/') ? window.CONFIG.serverUrl.slice(0, -1) : window.CONFIG.serverUrl;
    const enableBotFirst = window.CONFIG.enableBotFirst || false;
    return `${baseUrl}/chat?uid=${visitorId}&group_id=${groupId}&device_info=${deviceInfo}&timestamp=${timestamp}&bot_first=${enableBotFirst}`;
  }
  
  return '';
}

// 使函数成为全局可用
window.generateVisitorId = generateVisitorId;
window.getCustomerServiceGroup = getCustomerServiceGroup;
window.getDeviceInfo = getDeviceInfo;
window.getChatUrl = getChatUrl;