class WebSocketInstance {
    constructor() {
      this.socket = null;
      this.callbacks = [];
    }
  
    connect(endpoint) {
      this.socket = new WebSocket(endpoint);
  
      this.socket.onopen = () => {
        console.log('WebSocket connected');
      };
  
      this.socket.onclose = () => {
        console.log('WebSocket disconnected');
      };
  
      this.socket.onmessage = (e) => {
        this.callbacks.forEach((callback) => {
          callback(e);
        });
      };
    }
  
    disconnect() {
      this.socket.close();
    }
  
    handleIncomingMessage(callback) {
      this.callbacks.push(callback);
    }
  
    sendMessage(data) {
      this.socket.send(data);
    }
  }
  
  const instance = new WebSocketInstance();
  export default instance;
  