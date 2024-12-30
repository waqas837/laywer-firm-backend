"use strict";

const { saveMessage } = require("../../../../utils/saveMessages/saveMessages");

/**
 * save-bot-user-messages service
 */

module.exports = ({ strapi }) => ({
  saveMessage: async (ctx) => {
    const { QuestionsAnswers } = ctx.request.body.data;
    let {
      botQuestion,
      userAnswer,
      userid,
      username,
      socketid,
      phone,
      email,
      address,
    } = QuestionsAnswers;

    try {
      await saveMessage(
        botQuestion,
        userid,
        "bot",
        "user is bot",
        socketid,
        phone,
        email,
        address
      );
      await saveMessage(
        userAnswer,
        userid,
        "user",
        username,
        socketid,
        phone,
        email,
        address
      );
      return { success: true };
    } catch (error) {
      console.log("error", error);
      return { error };
    }
  },
});
