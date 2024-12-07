"use strict";

/**
 * A set of functions called "actions" for `bot-train`
 */

module.exports = {
  TrainTheBot: async (ctx, next) => {
    try {
      let res = await strapi.service("api::bot-train.bot-train").trainBot(ctx);
      ctx.body = res;
    } catch (err) {
      ctx.body = err;
    }
  },
};
