module.exports = ({ env }) => ({
  email: {
    config: {
      provider: "nodemailer",
      providerOptions: {
        host: env("SMTP_HOST"),
        port: env("SMTP_PORT"),
        auth: {
          user: env("SMTP_USERNAME"),
          pass: env("SMTP_PASSWORD"),
        },
      },
      settings: {
        defaultFrom: "ap@orkatek.io",
        defaultReplyTo: "hello@example.com",
      },
    },
  },
  "vercel-deploy": {
    enabled: true,
    config: {
      deployHook:
        "https://api.vercel.com/v1/integrations/deploy/prj_<deploy-hook>",
      apiToken: "mDjD9G3r7S0mEsdD5PomYgmm",
      appFilter: "your-app-name-on-vercel",
      teamFilter: "team_FeT6FFEFx21MuSg5oTyphOiz",
      roles: ["strapi-super-admin", "strapi-editor", "strapi-author"],
    },
  }
});
