# Sum API - Node.js TypeScript Express Application

A robust, production-ready REST API built with Node.js, TypeScript, and Express that calculates the sum of an array of numbers.

## Features

- **TypeScript-first**: Type-safe codebase for reliability and maintainability.
- **RESTful API**: Exposes a `/api/sum` endpoint to calculate the sum of numbers.
- **Input Validation**: Ensures only valid arrays of numbers are processed.
- **Security**: Uses Helmet, CORS, and input validation for secure operation.
- **Logging**: Centralized logging for requests and errors.
- **Error Handling**: Graceful error and 404 handling.
- **Production Ready**: Includes graceful shutdown and environment-based configuration.

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm

### Installation

```bash
git clone <repo-url>
cd node-ts-sum-api
npm install
```

### Running in Development

```bash
npm run dev
```

### Building for Production

```bash
npm run build
```

### Starting in Production

```bash
npm start
```

## API Usage

### Health Check

- **Endpoint:** `GET /health`
- **Response:**
  ```json
  {
    "success": true,
    "message": "Server is running",
    "timestamp": "2025-09-20T12:34:56.789Z"
  }
  ```

### Calculate Sum

- **Endpoint:** `POST /api/sum`
- **Request Body:**
  ```json
  {
    "numbers": [1, 2, 3.5, 4]
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "data": {
      "sum": 10.5
    }
  }
  ```

#### Validation Errors

- If the input is invalid, you’ll receive a 400 response with an error message:
  ```json
  {
    "success": false,
    "error": "Numbers array is required"
  }
  ```

## Project Structure

```
src/
  controllers/    # Route handlers (business logic)
  middlewares/    # Validation and error handling
  routes/         # API route definitions
  utils/          # Logger and helpers
  types/          # TypeScript interfaces
  app.ts          # Express app setup
  server.ts       # Server entry point
```

## Environment Variables

- `PORT` - Port to run the server (default: 3000)
- `NODE_ENV` - Environment (`development` or `production`)
- `ALLOWED_ORIGINS` - (Production) Comma-separated list of allowed CORS origins

Create a `.env` file in the root for local development if needed.

## Scripts

- `npm run dev` - Start in development mode (with nodemon)
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Run the compiled app
- `npm run clean` - Remove build output
