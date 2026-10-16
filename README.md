# Full-Stack Calculator Application

A full-stack calculator application built with a modern monorepo architecture. It features a strictly typed Node.js/Express backend and a React/Vite frontend, demonstrating professional software engineering practices including SOLID design principles, automated testing, containerization, and comprehensive input validation.

## Assignment Fulfillments & Design Decisions

* **Language Constraint Trade-off:** The assignment preferred a Go backend. However, given the strict 2–4 hour time box, a full TypeScript monorepo was chosen. This allowed for shared tooling (Vitest, ESLint), unified context, and strict type safety across the client-server boundary using Zod, maximizing correctness, clarity, and maintainability within the deadline.
* **SOLID Architecture:** The core mathematical logic in the backend is decoupled using the Strategy Pattern (`IOperationStrategy`). Adding new mathematical operations requires zero modifications to existing controller or service logic (Open/Closed Principle).
* **Validation & Error Handling:** Zod is used for runtime validation of incoming HTTP requests. Domain errors (`CalculationError`) and validation errors (`ZodError`) are caught by a centralized Express error middleware, ensuring the frontend always receives predictable, structured API responses.
* **Testing Strategy:** The frontend utilizes React Testing Library to test user behavior and accessibility rather than implementation details. The backend includes both unit tests for the mathematical strategies and HTTP integration tests.

## Tech Stack

* **Backend:** Node.js, Express, TypeScript, Zod
* **Frontend:** React, Vite, TypeScript, CSS
* **Testing:** Vitest, React Testing Library, Supertest
* **Deployment:** Docker, Docker Compose, Nginx

## Setup & Local Execution

### Prerequisites
* Node.js (v18 or higher recommended)
* npm
* Docker & Docker Compose (Optional, for containerized execution)

### 1. Local Development Mode

First, install dependencies for both workspaces:
```bash
cd backend
npm install
cd ../frontend
npm install
```

Set up your environment variables:
```bash
# In the backend directory
cp .env.example .env

# In the frontend directory
cp .env.example .env
```

Start the application using two terminal windows:

**Terminal 1 (Backend):**
```bash
cd backend
npm run dev
```
*The API will start on http://localhost:3001*

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
```
*The UI will start on http://localhost:5173*

### 2. Docker Execution

To run the entire full-stack application in isolated containers without needing Node.js installed locally, run from the root directory:

```bash
docker-compose up --build
```
* The React frontend will be served via Nginx at `http://localhost:80`
* The Express backend will be available at `http://localhost:3001`

## Running Tests

Both workspaces feature comprehensive automated testing (unit and HTTP integration tests).

**Test Backend:**
```bash
cd backend
npm run test
```

**Test Frontend (with UI Coverage):**
```bash
cd frontend
npm run coverage
```

## API Documentation

### `POST /api/calculate`

Calculates the result of a mathematical operation.

**Headers:**
* `Content-Type: application/json`

#### Example 1: Binary Operation (Addition, Subtraction, Multiplication, Division, Exponent, Percentage)
**Request:**
```json
{
  "operation": "add",
  "a": 10,
  "b": 5
}
```
**Success Response (200 OK):**
```json
{
  "result": 15
}
```

#### Example 2: Unary Operation (Square Root)
**Request:**
```json
{
  "operation": "sqrt",
  "a": 16
}
```
**Success Response (200 OK):**
```json
{
  "result": 4
}
```

#### Example 3: Error Handling (Division by Zero)
**Request:**
```json
{
  "operation": "divide",
  "a": 10,
  "b": 0
}
```
**Error Response (400 Bad Request):**
```json
{
  "error": {
    "code": "DIVISION_BY_ZERO",
    "message": "Cannot divide by zero."
  }
}
```


## Design Decisions & Assumptions

### 1. Language Constraint vs. Timebox Delivery
* **Assumption:** The assignment noted that Go was "preferred" for the backend, but explicitly constrained the effort to a strict 2–4 hour window. We assumed that delivering a complete, high-quality, fully tested application within the timebox was a higher priority than strictly adhering to the preferred language.
* **Decision:** A Node.js/TypeScript full-stack monorepo architecture was selected.
* **Justification:** This approach eliminated context-switching between different ecosystems and allowed for shared tooling (Vitest, ESLint, Prettier). It also enabled strict type safety across the client-server boundary using shared interfaces and Zod schemas, effectively balancing delivery speed with professional quality.

### 2. Backend Architecture & SOLID Principles
* **Assumption:** While a simple `switch` statement could handle the initial arithmetic operations, it would violate maintainability standards and become brittle as new mathematical operations were added. 
* **Decision:** The backend's mathematical logic was decoupled using the Strategy Pattern (`IOperationStrategy`), mapping specific operations (e.g., `AdditionStrategy`, `SquareRootStrategy`) to a central execution service.
* **Justification:** This adheres strictly to the Open/Closed Principle. We can introduce new operations (like logarithms or modulo) by adding a new class without ever modifying the existing controller or service logic, satisfying the mandate for clean, readable, and maintainable code.

### 3. Validation Boundaries & Error Handling
* **Assumption:** Relying solely on the React frontend for input validation is insecure. The backend must independently verify all data to prevent unhandled runtime exceptions.
* **Decision:** Zod was implemented as an anti-corruption layer to validate all incoming HTTP requests at runtime before they reach the service layer.
* **Justification:** Combined with a centralized Express error-handling middleware, this guarantees that both domain-specific errors (e.g., `DIVISION_BY_ZERO`) and Zod validation errors are caught globally. This ensures the frontend always receives predictable, structured JSON error responses, strictly adhering to the standard for type safety and explicit error handling.

### 4. Testing Philosophy
* **Assumption:** Writing tests that assert internal state changes (e.g., checking if a React variable updated from `null` to `15`) creates brittle test suites that break during refactoring.
* **Decision:** The frontend utilizes React Testing Library to mock the API and test the UI exactly as a user interacts with it (e.g., typing into inputs, clicking buttons, and reading the DOM). The backend utilizes unit tests for individual math strategies and HTTP integration tests via Supertest.
* **Justification:** This approach focuses on verifying actual behavior rather than assuming the internal implementation works. It also natively enforces accessibility (a11y) standards by requiring inputs and labels to be properly linked for the tests to pass.

### 5. Deployment & Containerization
* **Assumption:** Although the Dockerfile was marked as "optional," providing a reproducible environment is a critical professional standard to eliminate "it works on my machine" discrepancies.
* **Decision:** A Multi-Container Docker Compose architecture was implemented. The backend uses a standard lightweight Node image, while the frontend utilizes a multi-stage build that compiles the React app and serves the static assets via a highly performant Nginx web server.
* **Justification:** This introduces professional deployment practices without adding unnecessary architectural complexity, keeping the setup simple while maximizing security and performance.

## AI Prompting Summary

This project was developed using a highly structured AI collaboration approach. The primary foundational prompt configured the AI to act as a "Senior Full-Stack Software Engineer and Technical Mentor". 

Key directives given to the AI included:
* **Mentorship over Generation:** Guide the development step-by-step rather than dumping complete codebases, explaining the "why" behind architectural decisions.
* **Professional Standards:** Strictly enforce clean code, type safety, explicit error handling, and automated testing.
* **Incremental Workflow:** Provide precise terminal commands, target specific files, and verify behavior iteratively.
* **Pragmatism:** Balance theoretical engineering principles with the reality of delivering a functional, high-quality application within a 2-4 hour deadline.