exports.socketEeventHandler = (io, socket, strapi) => {
  try {
    socket.on("adminSocketId", async (data) => {
      try {
        // Add this temporary debug code at the start of your updateSocketId handler
        const existingRecord = await strapi.db
          .query("api::admin-socket-record.admin-socket-record")
          .findOne();

        if (existingRecord?.id) {
          await strapi.db
            .query("api::admin-socket-record.admin-socket-record")
            .update({
              where: { id: existingRecord.id },
              data: {
                socketId: socket.id,
              },
            });
        } else {
          await strapi.db
            .query("api::admin-socket-record.admin-socket-record")
            .create({
              data: {
                socketId: socket.id,
              },
            });
        }
      } catch (error) {
        console.log("error", error);
      }
    });

    socket.on("UserWantsHelp", async ({ userid, msg }) => {
      // get socketid from the database
      // userdata
      const existingRecord = await strapi.db
        .query("api::chat-support.chat-support")
        .findOne({
          where: { userid: userid },
        });
      // console.log("existingRecord.socketId,", existingRecord.socketId);
      //  admin socket id
      const admin = await strapi.db
        .query("api::admin-socket-record.admin-socket-record")
        .findOne();
      // console.log(admin.socketId);
      let adminSockId = admin.socketId;
      socket.to(adminSockId).emit("message", {
        userid,
        username: existingRecord.userName,
        userSocketId: existingRecord.socketId,
        message: msg,
      });
    });

    // Now admin will chat with user help

    socket.on("LiveUserHelp", async ({ userid, text }) => {
      // console.log("userid, text", userid, text);
      try {
        // get socketid from the database
        // userdata
        const existingRecord = await strapi.db
          .query("api::chat-support.chat-support")
          .findOne({
            where: { userid: userid },
          });
        //  admin socket id
        // const admin = await strapi.db
        //   .query("api::admin-socket-record.admin-socket-record")
        //   .findOne();
        // console.log("existingRecord", existingRecord);
        let userSocketId = existingRecord.socketId;
        socket.to(userSocketId).emit("userHelpReply", {
          userid: existingRecord.userid,
          username: existingRecord.userName,
          userSocketId: existingRecord.socketId,
          message: text,
        });
      } catch (error) {
        console.log("error", error);
      }
    });
  } catch (error) {
    console.log("error", error);
  }
};
