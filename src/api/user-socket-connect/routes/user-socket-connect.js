module.exports = {
  routes: [
    {
      method: "GET",
      path: "/user-socket-connect",
      handler: "user-socket-connect.exampleAction",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "POST",
      path: "/user-socket-connect",
      handler: "user-socket-connect.postUserConn",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
