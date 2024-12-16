"use strict";

/**
 * A set of functions called "actions" for `save-bot-user-messages`
 */

module.exports = {
  exampleAction: async (ctx, next) => {
    try {
      let res = await strapi
        .service("api::save-bot-user-messages.save-bot-user-messages")
        .saveMessage(ctx);
      // Send the result
      ctx.body = res;
    } catch (err) {
      ctx.body = err;
    }
  },
};
