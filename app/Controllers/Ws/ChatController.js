"use strict";

class ChatController {
  constructor({ socket, request }) {
    this.socket = socket;
    this.request = request;
    // console.log(this.socket.id, "id");
  }
  onMessage(message) {
    console.log(this.socket.id, "id");
    // const userId = message.userId,
    // console.log(userId);
    // const message = message.body;
    // this.socket.broadcastToAll("message", (message.userName + " : " + message.body));
    this.socket.broadcastToAll("message", message.body);
    // socket.broadcast.to('ID').emit( 'send msg', {somedata : somedata_server} );
  }
}

module.exports = ChatController;
