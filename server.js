// path: /server.js
const strapi = require('@strapi/strapi');
const app = strapi({ distDir: './dist' });
app.start();