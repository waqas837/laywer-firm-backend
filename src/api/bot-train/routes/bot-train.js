module.exports = {
  routes: [
    {
     method: 'GET',
     path: '/bot-train',
     handler: 'bot-train.TrainTheBot',
     config: {
       policies: [],
       middlewares: [],
     },
    },
  ],
};
