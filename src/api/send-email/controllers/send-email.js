"use strict";

/**
 * A set of functions called "actions" for `send-email`
 */

module.exports = {
  exampleAction: async (ctx, next) => {
    try {
      let res = await strapi
        .service("api::send-email.send-email")
        .sendEmaiNow(ctx);
      // Send the result
      ctx.body = res;
    } catch (err) {
      ctx.body = err;
    }
  },
};
