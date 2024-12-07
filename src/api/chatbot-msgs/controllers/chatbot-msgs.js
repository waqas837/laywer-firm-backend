"use strict";

module.exports = {
  exampleAction: async (ctx, next) => {
    try {
      // the service is for write you bussiness logic.
      // first we register the service for this controller
      // api shows api folder::apiRouter.apiContoller.ServiceName(ctx);
      let res = await strapi
        .service("api::chatbot-msgs.chatbot-msgs")
        .chatbogtService(ctx);
      // Send the result
      ctx.body = res;
    } catch (err) {
      ctx.body = err;
    }
  },
};
