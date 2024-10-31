
# Task Manager API

This project implements the server-side of a task management system (Task Manager) using NestJS, TypeORM, PostgreSQL, and Docker.

## Required Tools

- [Node.js](https://nodejs.org/) (version 16.x or newer)
- [Docker](https://www.docker.com/) for containerizing the database
- [PostgreSQL](https://www.postgresql.org/) (if running locally)

## Environment Setup

Before starting, you need to set up the `.env` environment file with the following variables:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
JWT_SECRET=your_jwr_secret_key
SERVER_PORT=your_port
SENDGRID_API_KEY=your_secret_key
SENDER=your_sender_email
```

Create a `.env` file in the root directory of the project and fill it in by replacing `your_db_user`, `your_db_password`, and `your_db_name` with your actual database credentials.

## Running with Docker

1. In the root directory of the project, create the `.env` file as described above.
2. Open your terminal and run the following command to start the containers:

   ```bash
   docker-compose up --build
   ```

   This will start both the NestJS application and the PostgreSQL container with the database set up according to your `.env` file.

3. The API will be available at `http://localhost:3000`.

## Running Locally

1. Install the dependencies:

   ```bash
   npm install
   ```

2. Start a local PostgreSQL server, create a database, and configure the `.env` file as described earlier.
3. Run migrations to set up the database:

   ```bash
   npm run typeorm migration:run
   ```

4. Start the project in development mode:

   ```bash
   npm run start:dev
   ```

5. The API will be available at `http://localhost:3000`.

Details about all endpoints can be found in the Swagger documentation at `http://localhost:3000/api`.

## Testing

The project includes basic tests to verify functionality. You can run them with the command:

```bash
npm run test
```

## Additional Information

- **Swagger documentation**: available at `/api`.
- **Linting**: run `npm run lint` to check the code style.
