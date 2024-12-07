"use strict";
const { NlpManager } = require("node-nlp");
const path = require("path");

/**
 * chatbot-msgs service
 */

module.exports = ({ strapi }) => ({
  chatbogtService: async (ctx) => {
    try {
      // Define the path to the model file
      const modelPath = path.resolve("model.nlp");
      // Initialize NLP manager
      const nlpManager = new NlpManager({ languages: ["en"] });

      // Load the pre-trained model
      nlpManager.load(modelPath);

      // Get the query from the request
      const query = ctx.query.query;

      // Process the input
      const result = await nlpManager.process("en", query);
      return {
        intent: result.intent,
        score: result.score,
        answer: result.answer, // Response for the user.
      };
    } catch (err) {
      ctx.body = err;
    }
  },
});
