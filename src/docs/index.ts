import swaggerJSDoc, { type SwaggerDefinition } from "swagger-jsdoc";

const swaggerDefinition: SwaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Express API Docs for IV1201 Recruitment Application',
    version: '1.0.0',
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Development server',
    },
    {
      url: 'https://amusement-4d39a0dcf184.herokuapp.com',
      description: 'Production server',
    },
  ]
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ['src/routes/*.ts'],
};

export const swaggerSpec = swaggerJSDoc(options);
