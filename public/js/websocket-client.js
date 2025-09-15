// WebSocketClient类 - 用于管理WebSocket连接和消息处理
class WebSocketClient {
  constructor(visitorId) {
    this.config = window.CONFIG || {};
    this.visitorId = visitorId;
    this.socket = null;
    this.isConnected = false;
    this.reconnectAttempts = 0;
    this.MAX_RECONNECT_ATTEMPTS = 5;
    this.RECONNECT_DELAY = 3000;
    this.eventListeners = {};
    
    // 模拟模式下的消息队列
    this.mockMessageQueue = [
      {
        type: 'bot_response',
        content: '您好，我是智能客服助手，很高兴为您服务。请问有什么可以帮助您的吗？',
        delay: 1000
      },
      {
        type: 'bot_response',
        content: '如果您需要人工客服的帮助，可以随时点击上方的"转人工"按钮。',
        delay: 3000
      }
    ];
  }
  
  // 连接WebSocket
  connect() {
    if (this.config.useMockMode) {
      console.log('使用模拟模式，不建立真实WebSocket连接');
      this.isConnected = true;
      this.triggerEvent('connected');
      
      // 在模拟模式下，模拟初始消息
      setTimeout(() => {
        this.mockMessageQueue.forEach(msg => {
          setTimeout(() => {
            this.handleMockMessage(msg);
          }, msg.delay);
        });
      }, 1000);
      
      return;
    }

    if (!this.config.serverUrl) {
      console.error('serverUrl未配置，无法建立WebSocket连接');
      return;
    }

    try {
      const baseUrl = this.config.serverUrl.endsWith('/') ? this.config.serverUrl.slice(0, -1) : this.config.serverUrl;
      const wsUrl = `${baseUrl.replace('http:', 'ws:').replace('https:', 'wss:')}/ws?uid=${this.visitorId}&timestamp=${Date.now()}`;
      this.socket = new WebSocket(wsUrl);

      this.socket.onopen = () => {
        console.log('WebSocket连接已建立');
        this.isConnected = true;
        this.reconnectAttempts = 0;
        this.triggerEvent('connected');
      };

      this.socket.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          this.handleMessage(message);
        } catch (e) {
          console.error('解析WebSocket消息失败:', e);
        }
      };

      this.socket.onerror = (error) => {
        console.error('WebSocket连接错误:', error);
        this.triggerEvent('error', error);
      };

      this.socket.onclose = () => {
        console.log('WebSocket连接已关闭');
        this.isConnected = false;
        this.triggerEvent('disconnected');
        
        // 尝试重连
        if (this.reconnectAttempts < this.MAX_RECONNECT_ATTEMPTS) {
          this.reconnectAttempts++;
          console.log(`尝试重连... (${this.reconnectAttempts}/${this.MAX_RECONNECT_ATTEMPTS})`);
          setTimeout(() => {
            this.connect();
          }, this.RECONNECT_DELAY);
        }
      };
    } catch (error) {
      console.error('初始化WebSocket连接失败:', error);
      this.triggerEvent('error', error);
    }
  }
  
  // 处理消息
  handleMessage(message) {
    console.log('收到消息:', message);
    
    // 根据消息类型分发事件
    switch (message.type) {
      case 'message':
        this.triggerEvent('message', message);
        break;
      case 'typing':
        this.triggerEvent('typing', message.from);
        break;
      case 'read':
        this.updateMessageStatus(message.messageId, 'read');
        break;
      case 'system':
        this.triggerEvent('notification', { content: message.content, type: 'info' });
        break;
      case 'transfer_human_suggest':
        this.triggerEvent('notification', { 
          content: '智能体无法回答您的问题，建议转人工客服', 
          type: 'warning' 
        });
        this.triggerEvent('showTransferButton');
        break;
      case 'transfer_human_success':
        this.triggerEvent('notification', { 
          content: '已为您转接人工客服，客服人员将尽快回复', 
          type: 'success' 
        });
        this.triggerEvent('hideTransferButton');
        break;
      case 'transfer_human_failed':
        this.triggerEvent('notification', { 
          content: '转人工客服失败，请稍后再试', 
          type: 'error' 
        });
        break;
      case 'agent_to_human':
        this.triggerEvent('notification', { 
          content: '客服人员已接入，正在为您服务', 
          type: 'success' 
        });
        this.triggerEvent('hideTransferButton');
        break;
      default:
        console.warn('未知的消息类型:', message.type);
        break;
    }
  }
  
  // 发送消息
  sendMessage(type, data) {
    if (this.config.useMockMode) {
      // 模拟模式下的消息处理
      const message = {
        type: type,
        data: data,
        timestamp: Date.now()
      };
      console.log('模拟发送消息:', message);
      
      // 模拟转人工客服请求处理
      if (type === 'transfer_human_request') {
        setTimeout(() => {
          this.handleMockMessage({
            type: 'transfer_human_success',
            content: '已为您转接人工客服'
          });
          
          // 再模拟1-2秒后客服接入
          setTimeout(() => {
            this.handleMockMessage({
              type: 'agent_to_human',
              content: '客服小张已接入'
            });
            
            // 模拟客服发送第一条消息
            setTimeout(() => {
              this.handleMockMessage({
                type: 'message',
                from: '客服小张',
                content: '您好，很高兴为您服务！请问有什么可以帮助您的吗？'
              });
            }, 1000);
          }, Math.random() * 1000 + 1000);
        }, Math.random() * 2000 + 1000);
      }
      
      return true;
    }

    if (!this.socket || !this.isConnected) {
      console.error('WebSocket未连接，无法发送消息');
      return false;
    }

    try {
      const message = {
        type: type,
        data: data,
        timestamp: Date.now()
      };
      this.socket.send(JSON.stringify(message));
      return true;
    } catch (error) {
      console.error('发送WebSocket消息失败:', error);
      return false;
    }
  }
  
  // 处理模拟模式下的消息
  handleMockMessage(message) {
    this.handleMessage(message);
  }
  
  // 请求转人工客服
  requestTransferToHuman() {
    return this.sendMessage('transfer_human_request', {});
  }
  
  // 注册事件监听器
  on(event, callback) {
    if (!this.eventListeners[event]) {
      this.eventListeners[event] = [];
    }
    this.eventListeners[event].push(callback);
  }
  
  // 移除事件监听器
  off(event, callback) {
    if (this.eventListeners[event]) {
      this.eventListeners[event] = this.eventListeners[event].filter(cb => cb !== callback);
    }
  }
  
  // 触发事件
  triggerEvent(event, data) {
    if (this.eventListeners[event]) {
      this.eventListeners[event].forEach(callback => {
        try {
          callback(data);
        } catch (error) {
          console.error(`事件处理器错误 (${event}):`, error);
        }
      });
    }
  }
  
  // 关闭连接
  close() {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
      this.isConnected = false;
    }
  }
  
  // 获取连接状态
  getStatus() {
    return {
      isConnected: this.isConnected,
      reconnectAttempts: this.reconnectAttempts,
      maxReconnectAttempts: this.MAX_RECONNECT_ATTEMPTS
    };
  }
  
  // 更新消息状态
  updateMessageStatus(messageId, status) {
    console.log(`更新消息状态: ${messageId} -> ${status}`);
    this.triggerEvent('message_status', { messageId, status });
  }
  
  // 创建打字指示器
  createTypingIndicator(from) {
    const indicator = document.createElement('div');
    indicator.id = 'typingIndicator';
    indicator.className = 'typing-indicator';
    indicator.innerHTML = `<i class="fas fa-paper-plane"></i> ${from} 正在输入...`;
    return indicator;
  }
  
  // 显示打字指示器
  showTypingIndicator(from) {
    // 创建或更新"正在输入"提示
    let typingIndicator = document.getElementById('typingIndicator');
    if (!typingIndicator) {
      typingIndicator = this.createTypingIndicator(from);
      document.body.appendChild(typingIndicator);
    }
    
    typingIndicator.style.display = 'block';
    
    // 3秒后隐藏指示器
    setTimeout(() => {
      if (typingIndicator) {
        typingIndicator.style.display = 'none';
      }
    }, 3000);
  }
}

// 使WebSocketClient类成为全局可用
window.WebSocketClient = WebSocketClient;