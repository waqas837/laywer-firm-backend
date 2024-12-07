"use strict";

/**
 * A set of functions called "actions" for `user-socket-connect`
 */

module.exports = {
  exampleAction: async (ctx, next) => {
    try {
      ctx.body = "ok";
    } catch (err) {
      ctx.body = err;
    }
  },
  postUserConn: async (ctx, next) => {
    try {
      let res = await strapi
        .service("api::user-socket-connect.user-socket-connect")
        .userSocketConnect(ctx);
      ctx.body = res;
    } catch (err) {
      ctx.body = err;
    }
  },
};
