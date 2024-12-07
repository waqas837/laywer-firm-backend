"use strict";
const { v4: uuidv4 } = require("uuid");

/**
 * user-socket-connect service
 */

module.exports = ({ strapi }) => ({
  userSocketConnect: async (ctx) => {
    let { id } = strapi.socket;
    let { userid, userName, address, phone, email, issue } =
      ctx.request.body.formDatachat;
    try {
      let entry;

      if (userid) {
        // If `userid` is provided, check if it exists
        const existingUser = await strapi.entityService.findMany(
          "api::chat-support.chat-support",
          {
            filters: { userid },
          }
        );

        if (existingUser.length > 0) {
          // If user exists, update the record
          entry = await strapi.entityService.update(
            "api::chat-support.chat-support",
            existingUser[0].id,
            {
              data: {
                socketId: id, // Update socketId
                userName, // Optionally update userName
              },
            }
          );
        } else {
          // If `userid` does not exist, create a new record
          entry = await strapi.entityService.create(
            "api::chat-support.chat-support",
            {
              data: {
                userid, // Use the provided userid
                socketId: id,
              },
            }
          );
        }
      } else {
        // If `userid` is not provided, create a new record
        entry = await strapi.entityService.create(
          "api::chat-support.chat-support",
          {
            data: {
              userid: uuidv4(), // Generate a new UUID
              userName,
              socketId: id,
              userName,
              address,
              phone,
              email,
              issue,
            },
          }
        );
      }

      return {
        success: true,
        data: entry,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  },
});
