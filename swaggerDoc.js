const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Hello World",
      version: "1.0.0"
    }
  },
  apis: ["./api/routes/*.js"]
};


const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;

