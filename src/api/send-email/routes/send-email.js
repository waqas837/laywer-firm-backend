module.exports = {
  routes: [
    {
      method: "GET",
      path: "/send-email",
      handler: "send-email.exampleAction",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "POST",
      path: "/send-email",
      handler: "send-email.exampleAction",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
