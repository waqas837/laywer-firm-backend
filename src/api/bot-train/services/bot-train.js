"use strict";
const { NlpManager } = require("node-nlp");

/**
 * bot-train service
 */
module.exports = ({ strapi }) => ({
  trainBot: async (ctx) => {
    try {
      // Initialize NLP manager
      const nlpManager = new NlpManager({ languages: ["en"] });

      // Greeting intents
      nlpManager.addDocument("en", "Hi", "greeting.hello");
      nlpManager.addDocument("en", "Hello", "greeting.hello");
      nlpManager.addDocument("en", "Hey", "greeting.hello");
      nlpManager.addDocument("en", "Good morning", "greeting.hello");
      nlpManager.addDocument("en", "Good afternoon", "greeting.hello");
      nlpManager.addDocument("en", "Good evening", "greeting.hello");

      // General information collection
      nlpManager.addDocument("en", "I need legal help", "general.inquiry");
      nlpManager.addAnswer(
        "en",
        "general.inquiry",
        "Please provide your full name, address, contact phone number, email address, and a brief explanation of the issue at hand."
      );

      // Personal Injury Law
      nlpManager.addDocument(
        "en",
        "I had a car accident",
        "personal_injury.car_accident"
      );
      nlpManager.addDocument(
        "en",
        "I need help with a truck accident",
        "personal_injury.truck_accident"
      );
      nlpManager.addDocument(
        "en",
        "I slipped and fell",
        "personal_injury.slip_fall"
      );
      nlpManager.addAnswer(
        "en",
        "personal_injury.car_accident",
        "Please provide the date, location, crash report number, time of the crash, whether airbags deployed, and any photos of the incident. Also share your driver's license number, insurance details, and a list of injuries sustained."
      );
      nlpManager.addAnswer(
        "en",
        "personal_injury.slip_fall",
        "Can you provide the location of the fall, whether it was reported to a person in charge, a copy of the report, and photos of the location?"
      );

      // Estate Planning
      nlpManager.addDocument(
        "en",
        "I need help with a revocable trust",
        "estate_planning.revocable_trust"
      );
      nlpManager.addAnswer(
        "en",
        "estate_planning.revocable_trust",
        "Please provide your marital status, number of children (current and prior marriage), number of minors, properties owned, business interests, and your primary purpose for requesting the trust."
      );

      // Probate Clients
      nlpManager.addDocument(
        "en",
        "I need help with probate",
        "probate.general"
      );
      nlpManager.addAnswer(
        "en",
        "probate.general",
        "Please provide the deceased's name, county of death, marital status, and residence details. Also share whether the deceased had a will or trust, any real estate owned, and a list of surviving children or spouse."
      );

      // Family Law
      nlpManager.addDocument(
        "en",
        "I need a divorce lawyer",
        "family_law.divorce"
      );
      nlpManager.addAnswer(
        "en",
        "family_law.divorce",
        "Please provide the date of marriage, separation, number of minor children, real estate owned, businesses shared, and your preference for custody. Also let us know if there have been any reported disputes."
      );

      // Property Law
      nlpManager.addDocument(
        "en",
        "I have a tenant issue",
        "property_law.eviction"
      );
      nlpManager.addDocument(
        "en",
        "I have a real estate dispute",
        "property_law.general"
      );
      nlpManager.addAnswer(
        "en",
        "property_law.eviction",
        "Please provide the property address, tenant and landlord names, lease agreement, and any notices or payments. Also describe the breach of contract, if applicable."
      );
      nlpManager.addAnswer(
        "en",
        "property_law.general",
        "Please share the property address, any contracts at issue, names of parties involved, and a brief explanation of the dispute."
      );

      // Contract Law
      nlpManager.addDocument(
        "en",
        "I have a contract dispute",
        "contract_law.general"
      );
      nlpManager.addAnswer(
        "en",
        "contract_law.general",
        "Please provide the offending party's name and address, along with a copy of any related documents and a brief explanation of the issue."
      );

      // Train the NLP model
      await nlpManager.train();
      nlpManager.save();

      return { message: "Bot Trained Successfully." };
    } catch (err) {
      ctx.body = err;
    }
  },
});
