"use strict";

/**
 * send-email service
 */

module.exports = ({ strapi }) => ({
  sendEmaiNow: async (ctx) => {
    try {
      // console.log("send email transcript", ctx.request.body);
      let { data } = ctx.request.body;

      // Extract user info from the first chat message (assuming it's the same for all messages)
      let { username, email, phone, address } = data[0];

      let userInformation = `
  <div style="margin-bottom: 20px; padding: 15px; background-color: #fffbe7; border-radius: 5px; border-left: 4px solid #ffd700;">
    <h3 style="color: #ffb700; margin: 0;">User Information</h3>
    <p style="margin: 5px 0;"><strong>Name:</strong> ${username || "N/A"}</p>
    <p style="margin: 5px 0;"><strong>Email:</strong> ${email || "N/A"}</p>
    <p style="margin: 5px 0;"><strong>Phone:</strong> ${phone || "N/A"}</p>
    <p style="margin: 5px 0;"><strong>Address:</strong> ${address || "N/A"}</p>
  </div>
`;

      let chatTranscript = data
        .filter((item) => item.botQuestion && item.botQuestion !== "N/A") // Ignore invalid bot questions
        .map((item) => {
          return `
      <div style="margin-bottom: 15px;">
        <div style="padding: 10px; background-color: #fffbe7; border-radius: 5px; border-left: 4px solid #ffd700;">
          <strong style="color: #ffb700;">Bot:</strong> ${
            item.botQuestion || "N/A"
          }
        </div>
        <div style="padding: 10px; background-color: #ffffcc; border-radius: 5px; border-left: 4px solid #ffc107;">
          <strong style="color: #ffc107;">User:</strong> ${
            item.userAnswer || "N/A"
          }
        </div>
      </div>`;
        })
        .join("");

      await strapi.plugins["email"].services.email.send({
        from: "ap@orkatek.io",
        to: "ap@orkatek.io",
        subject: "Chat Transcript with User Information",
        html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border: 1px solid #ddd; border-radius: 8px;">
      <h2 style="color: #ffb700; text-align: center; margin-bottom: 20px;">Chat Transcript</h2>
      ${userInformation}
      <div>
        <h3 style="color: #ffb700; border-bottom: 2px solid #ffd700; padding-bottom: 5px;">Transcript</h3>
        ${chatTranscript}
      </div>
    </div>
  `,
      });

      return {
        success: true,
      };
    } catch (error) {
      console.log("error", error);
      return {
        success: false,
        error: error,
      };
    }
  },
});
