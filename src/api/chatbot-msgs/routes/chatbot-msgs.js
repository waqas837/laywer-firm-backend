module.exports = {
  routes: [
    {
     method: 'GET',
     path: '/chatbot-msgs',
     handler: 'chatbot-msgs.exampleAction',
     config: {
       policies: [],
       middlewares: [],
     },
    },
  ],
};
