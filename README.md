# IV1201 Design of Global Applications

## Project description
This project is the backend part of a recruitment application. The application is designed to be used by *applicants* and *recruiters*. The application allows applicants to apply for jobs and recruiters to handle applications. The backend is built using TypeScript, Node.js and the Express framework. Communication with the database is handled by Sequelize ORM and we're using a Postgres database. Developed as part of the course IV1201 Design of Global Applications at KTH. 

## Installation
1. Clone the repository
2. Run `npm install` to install dependencies
3. Refer to the `.env.example` file for environment variables that need to be set
4. Run `npm run dev` to start the local development server
5. The server will be running on `http://localhost:3000`

## Project structure
The project is structured as follows:
- `src/` 
  - `config/` - Contains configuration files, e.g. database configuration
  - `controllers/` - Contains the controllers that handle requests
  - `docs/` - Contains setup for serving the OpenAPI documentation
  - `models/` - Contains the Sequelize models and DTOs
  - `routes/` - Contains the routes
  - `services/` - Contains the services that handle business logic
  - `repositories/` - Contains the repositories that handle database queries
- `__tests__/` - Contains tests
---

In short, all endpoints are defined in the `routes` directory. The routes are mapped to controllers which in turn call services. The services handle the business logic and call the repositories which handle the database queries. The models directory contains the Sequelize models and DTOs.

## Documentation

### API documentation
The API is documented using OpenAPI (formerly Swagger) and is viewable in a nice UI at `http://localhost:3000/docs` when the server is running.

### General documentation
Function parameters, return types and other general type documentation is mainly covered by TypeScript but also JSDoc comments.

---

## Testing
The project uses Jest for testing. Run `npm test` to run the tests. Tests are located in the `__tests__` directory.

## CI/CD
The project uses GitHub Actions for CI/CD. The starting point and main workflow is defined in `.github/workflows/main.yml`. The workflow runs tests and linters on every push and are required to pass to allow pushing to `main`.