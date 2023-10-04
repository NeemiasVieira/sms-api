import swaggerJsdoc from 'swagger-jsdoc';

const options = {
    definition: {
      openapi: "3.1.0",
      info: {
        title: "Sistema de monitoramento do Solo - API",
        version: "1.0.0",
        description:
          "Mudar depois",
        license: {
          name: "MIT",
          url: "https://spdx.org/licenses/MIT.html",
        },
        contact: {
          name: "LogRocket",
          url: "https://logrocket.com",
          email: "info@email.com",
        },
      },
    },
    apis: ["routes.js"],
  };

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
