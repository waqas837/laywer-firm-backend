module.exports = {
  routes: [
    {
      method: "GET",
      path: "/save-bot-user-messages",
      handler: "save-bot-user-messages.exampleAction",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "POST",
      path: "/save-bot-user-messages",
      handler: "save-bot-user-messages.exampleAction",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
