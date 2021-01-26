"use strict";
const LiveChatDetail = use("App/Models/LiveChatDetail");
const Database = use("Database");
class MessageController {
  // get user Message
  async view({ auth, params }) {
    try {
      const user = await auth.getUser();
      // console.log(user.toJSON());
      const { id } = params;
      // console.log(id);
      const userMessage = await Database.table("live_chat_details")
        .where(function () {
          this.where("send_user_id", user.id).where("receive_user_id", id);
        })
        .orWhere(function () {
          this.where("send_user_id", id).where("receive_user_id", user.id);
        })
        .select("message","user_name");
      // console.log(userMessage, "Message");
      return userMessage;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = MessageController;
