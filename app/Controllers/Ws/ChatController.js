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
      const username = info.userName;
      // console.log(username);
      // find user socket id exist or not
      const userData = await LiveChat.find(userId);
      // console.log(userData);
      if (!userData) {
        await Database.table("live_chats").insert({
          user_id: userId,
          socket_id: this.socket.id,
          user_name: username,
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
      const sendUserNm = message.userName;
      const receiveUserId = message.receiveUserId;
      const userMessage = message.body;
      // console.log(sendUserNm);
      // return
      // store message
      await Database.table("live_chat_details").insert({
        send_user_id: sendUserId,
        receive_user_id: receiveUserId,
        message: userMessage,
        user_name: sendUserNm,
      });
      // get send user socket id and name
      const sendUserSocketData = await LiveChat.find(sendUserId);
      const sendUserSocketId = sendUserSocketData.socket_id;
      const sendUserName = sendUserSocketData.user_name;
      // console.log(sendUserName);
      // get receive user socket id
      const receiveUserSocketData = await LiveChat.find(receiveUserId);
      const receiveUserSocketId = receiveUserSocketData.socket_id;
      // console.log(receiveUserSocketId);

      let messageDetails = {
        sendUserName,
        sendUserId,
        userMessage
      }
      // this.socket.broadcastToAll("message", (message.userName + " : " + message.body));
      // this.socket.broadcastToAll("message", message.body);
      this.socket.emitTo("message", messageDetails, [
        sendUserSocketId, // send user socket id
        receiveUserSocketId, // receive user socket id
      ]);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = ChatController;
