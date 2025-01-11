"use strict";

const { socketEeventHandler } = require("../utils/socketUtils/socketHandler");

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap({ strapi }) {
    //strapi.server.httpServer is the new update for Strapi V4
    const io = require("socket.io")(strapi.server.httpServer, {
      cors: {
        origin: "*", // Allow frontend from localhost:3000
        methods: ["GET", "POST"],
        credentials: true,
      },
    });

    io.on("connection", function (socket) {
      try {
        strapi.io = io;
        strapi.socket = socket;
        // Socket id handler
        socket.on("updateSocketId", async ({ userid }) => {
          // Add this temporary debug code at the start of your updateSocketId handler
          const existingRecord = await strapi.db
            .query("api::chat-support.chat-support")
            .findOne({
              where: { userid: userid },
            });
          if (existingRecord?.userid) {
            await strapi.db.query("api::chat-support.chat-support").update({
              where: { userid: existingRecord.userid },
              data: {
                socketId: socket.id,
              },
            });
          }
        });
        // Message Handler
        socketEeventHandler(io, socket, strapi);
      } catch (error) {
        console.log("error", error);
      }
    });
  },
};
