"use strict";
const LiveChat = use("App/Models/LiveChat");
const LiveChatDetail = use("App/Models/LiveChatDetail");
const Database = use("Database");
class ChatController {
  constructor({ socket, request }) {
    this.socket = socket;
    this.request = request;
    // console.log(this.socket.id, "id");
  }
  // set user socket id
  async onSetusersocketid(info) {
    try {
      // console.log(this.socket.id, "id");
      // console.log(info);
      const userId = info.userId;
      // console.log(userId);
      // find user socket id exist or not
      const userData = await LiveChat.find(userId);
      // console.log(userData);
      if (!userData) {
        await Database.table("live_chats").insert({
          user_id: userId,
          socket_id: this.socket.id,
        });
        // console.log("insert");
      } else {
        await Database.table("live_chats")
          .where("live_chats.id", userId)
          .update({
            socket_id: this.socket.id,
          });
        // console.log("update");
      }
    } catch (error) {
      // console.log(error);
    }
  }
  async onMessage(message) {
    try {
      // console.log(message);
      // console.log(this.socket.id, "id");
      const sendUserId = message.sendUserId;
      const receiveUserId = message.receiveUserId;
      const userMessage = message.body;
      // console.log(userMessage);
      // store message
      await Database.table("live_chat_details").insert({
        send_user_id: sendUserId,
        receive_user_id: receiveUserId,
        message: userMessage,
      });
      // get send user socket id
      const sendUserSocketData = await LiveChat.find(sendUserId);
      const sendUserSocketId = sendUserSocketData.socket_id;
      // get receive user socket id
      const receiveUserSocketData = await LiveChat.find(receiveUserId);
      const receiveUserSocketId = receiveUserSocketData.socket_id;
      // console.log(receiveUserSocketId);

      // this.socket.broadcastToAll("message", (message.userName + " : " + message.body));
      // this.socket.broadcastToAll("message", message.body);
      this.socket.emitTo("message", userMessage, [
        sendUserSocketId, // send user socket id
        receiveUserSocketId, // receive user socket id
      ]);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = ChatController;
