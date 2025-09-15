// 显示通知
function showNotification(message, type = 'info') {
  // 创建通知元素
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <i class="fas ${getNotificationIcon(type)}"></i>
    <span>${message}</span>
    <button class="close-notification">×</button>
  `;
  
  // 添加关闭事件
  notification.querySelector('.close-notification').addEventListener('click', () => {
    notification.remove();
  });
  
  // 添加到页面
  document.body.appendChild(notification);
  
  // 自动消失
  setTimeout(() => {
    notification.classList.add('fade-out');
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// 获取通知图标
function getNotificationIcon(type) {
  switch (type) {
    case 'success': return 'fa-check-circle';
    case 'error': return 'fa-exclamation-circle';
    case 'warning': return 'fa-exclamation-triangle';
    default: return 'fa-info-circle';
  }
}

// 使函数成为全局可用
window.showNotification = showNotification;
window.getNotificationIcon = getNotificationIcon;