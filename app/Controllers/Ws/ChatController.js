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
      const userDetails = await Database.table("live_chats")
      .where("user_id", userId)
      .select("user_id")
      const userDetailsData = userDetails.map(i => i.user_id)
      const userData = userDetailsData[0] 
      // console.log(userData, "user data");
      // return
      if (userData == '') {
        await Database.table("live_chats").insert({
          user_id: userId,
          socket_id: this.socket.id,
          user_name: username,
        });
        // console.log("insert");
      } else {
        await Database.table("live_chats")
          .where("live_chats.user_id", userData)
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
      // console.log(sendUserId , "id");
      // return
      // store message
      await Database.table("live_chat_details").insert({
        send_user_id: sendUserId,
        receive_user_id: receiveUserId,
        message: userMessage,
        user_name: sendUserNm,
      });
      // get send user socket id and name
      const sendUserSocketData = await Database.table("live_chats")
      .where("user_id", sendUserId)
      .select("socket_id", "user_name")
      // console.log(sendUserSocketData);
      const sendUserSocket = sendUserSocketData.map(i => i.socket_id)
      const sendUserSocketId = sendUserSocket[0]
      const sendUserNameData = sendUserSocketData.map(i => i.user_name)
      const sendUserName = sendUserNameData[0] 
      // console.log(sendUserSocketId);
      // console.log(sendUserName);
      // get receive user socket id
      const receiveUserSocketData = await Database.table("live_chats")
      .where("user_id", receiveUserId)
      .select("socket_id")
      // console.log(receiveUserSocketData, "receiveUserSocketData");
      const receiveUserSocket = receiveUserSocketData.map(i => i.socket_id)
      const receiveUserSocketId = receiveUserSocket[0];
      // console.log(receiveUserSocketId.map(i => i));
      // console.log(receiveUserSocketId, "receive");

      let messageDetails = {
        sendUserName,
        sendUserId,
        receiveUserId,
        userMessage
      }
      // console.log(messageDetails, "details");
      // this.socket.broadcastToAll("message", (message.userName + " : " + message.body));
      // this.socket.broadcastToAll("message", message.body);
      this.socket.emitTo("message", messageDetails, [
        sendUserSocketId, // send user socket id
        receiveUserSocketId, // receive user socket id
      ]);
    } catch (error) {
      // console.log(error);
    }
  }
}

module.exports = ChatController;
