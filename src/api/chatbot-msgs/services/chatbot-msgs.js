"use strict";
const OpenAI = require("openai");
const { saveMessage } = require("../../../../utils/saveMessages/saveMessages");

module.exports = ({ strapi }) => ({
  chatbogtService: async (ctx) => {
    try {
      const query = ctx.query.query;
      const userId = ctx.query.userId;
      const username = ctx.query.username;
      const socketid = ctx.query.socketid;
      const email = ctx.query.email;
      const phone = ctx.query.phone;
      const address = ctx.query.address;
      // Categories with expanded context patterns
      await saveMessage(
        query,
        userId,
        "user",
        username,
        socketid,
        email,
        phone,
        address
      );
      const categories = {
        personal_injury: {
          keywords: [
            "accident",
            "crash",
            "injuries",
            "collision",
            "damage",
            "hospital",
          ],
          contextPatterns: [
            "had an accident",
            "got into an accident",
            "was hurt",
            "injured",
            "collision",
          ],
          questions: [
            "Date of accident",
            "Crash location",
            "County where crash/incident occurred",
            "Crash report number",
            "Time of crash",
            "Brief Accident Explanation",
            "Did air bags deploy?",
            "Submit Incident Photos, if any",
            "Driver's License Number and Issuing State",
            "Personal Policy information",
            "Name of Insurance Company",
            "Policy Number",
            "Do you have UM Policy Y/N",
            "UM Policy Limits",
            "List of Injuries sustained",
            "Did you go to the hospital Y/N",
            "Name of Hospital Attended",
            "Currently treating at chiropractor Y/N",
            "Name of Chiropractor Provider",
            "Location of slip and fall",
            "Did you report it to any person in charge at the location?",
            "Can you provide us with a copy of the report?",
            "Do you have photos of the location where the fall took place?",
          ],
        },
        estate_planning: {
          keywords: ["trust", "estate", "will", "asset protection"],
          contextPatterns: [
            "create a trust",
            "estate planning",
            "write a will",
          ],
          questions: [
            "Married or single?",
            "How many children are from the current marriage?",
            "How many children from prior marriage?",
            "How many of those children are Minors?",
            "How many real properties do you own?",
            "List of addresses of all real properties owned:",
            "Do you own any Businesses within the State of Florida?",
            "List the names of all businesses which you own a legal interest on",
            "List your primary purpose to request trust?",
          ],
        },
        family_law: {
          keywords: ["divorce", "custody", "family"],
          contextPatterns: [
            "dissolution of marriage",
            "custody dispute",
            "family law",
          ],
          questions: [
            "Were you already served with a Dissolution of Marriage Complaint? Y/N",
            "Date of Service of Complaint",
            "Date of marriage",
            "Date of separation",
            "Number of minor children",
            "Do you own any real estate property in common?",
            "How many real estate properties do you own in common?",
            "How many real estate properties were purchased during the marriage?",
            "List of addresses of all real estate properties owned in common or purchased during the marriage",
            "Do you own any business interests in common?",
            "List name of businesses?",
            "Would you like to participate in a mutual agreement as part of the divorce?",
            "Would it be a contested divorce?",
            "On your latest personal tax filings did you claim an income of more than $50,000 or less?",
            "Would you like to have shared custody of minor children or sole custody?",
            "During the marriage has there ever been any reported physical or verbal disputes between the husband and wife? Y/N",
            "List the county and approximate date of where the reported dispute took place",
          ],
        },
        property_law: {
          keywords: ["eviction", "dispute", "real estate"],
          contextPatterns: [
            "eviction notice",
            "property dispute",
            "real estate law",
          ],
          questions: [
            "List address of property in dispute",
            "Name of tenants",
            "Name of landlord",
            "Submit copy of lease agreement",
            "Submit copies of identifications, if available",
            "Monthly payment amount",
            "Last date of payment received",
            "Current amount outstanding",
            "Submit copy of any notices provided to the tenant by landlord",
            "Explanation of the breach of contract committed by the tenant, if applicable",
          ],
        },
        contract_law: {
          keywords: ["contract", "agreement", "breach"],
          contextPatterns: ["breach of contract", "contract dispute"],
          questions: [
            "Name of offending party",
            "Address of offending party",
            "Brief explanation of services being requested",
            "Submit copy of any documents in relation to this matter",
          ],
        },
      };

      const client = new OpenAI({ apiKey: process.env.OPEN_AI_KEY });

      // Enhanced analysis prompt
      const analysisPrompt = `
        Analyze the following query: "${query}".
        Classify it into one of the categories:
        1. personal_injury
        2. estate_planning
        3. family_law
        4. property_law
        5. contract_law
        6. general_question
        7. legal_advice_request
        8. other (unclear or doesn't fit)

        Response format:
        {
          "category": "category_from_above",
          "confidence": 0-1,
          "detected_intent": "explanation",
          "requires_follow_up": boolean,
          "suggested_response": "suggested_response"
        }`;

      const analysisCompletion = await client.chat.completions.create({
        messages: [
          {
            role: "system",
            content:
              "You are a legal assistant trained to categorize user queries and provide helpful responses.",
          },
          { role: "user", content: analysisPrompt },
        ],
        model: "gpt-3.5-turbo",
        temperature: 0.3,
      });

      const analysis = JSON.parse(
        analysisCompletion.choices[0].message.content
      );

      // Fix: Changed the category reference to match exactly with the categories object
      if (
        analysis.category === "personal_injury" &&
        analysis.confidence > 0.7
      ) {
        // Fix: Use consistent category name
        const categoryQuestions = categories.personal_injury.questions;
        if (categoryQuestions) {
          return {
            exact: true,
            category: "personal_injury",
            questions: categoryQuestions,
            intro_message:
              "It seems like you've been in an accident. Could you share the following details to assist further?",
          };
        }
      }

      if (analysis.confidence < 0.4) {
        let answer =
          "Your query doesn't fit into a specific category we handle. Please provide more information or contact us directly for assistance.";
        await saveMessage(
          query,
          userId,
          "user",
          username,
          socketid,
          email,
          phone,
          address
        );
        return {
          contactToLiveSession: true,
          answer,
        };
      }

      if (analysis.category === "other") {
        let answer =
          "Your query doesn't fit into a specific category we handle. Please provide more information or contact us directly for assistance.";
        await saveMessage(
          query,
          userId,
          "user",
          username,
          socketid,
          email,
          phone,
          address
        );
        return {
          contactToLiveSession: true,
          answer,
        };
      }

      await saveMessage(
        query,
        userId,
        "user",
        username,
        socketid,
        email,
        phone,
        address
      );
      return {
        exact: false,
        answer: analysis.suggested_response,
      };
    } catch (err) {
      console.log("Error:", err);
      ctx.body = err;
    }
  },
});
