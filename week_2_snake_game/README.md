# Coding Interview Platform

## Homework Answers

### Question 1: Initial Implementation
**Prompt:**
"Implement a coding interview platform with React frontend and Express backend. It should support real-time code collaboration using Socket.io, syntax highlighting with Monaco Editor, and safe code execution using Pyodide for Python and eval for JavaScript."

### Question 2: Integration Tests
**Command:**
`npm test` (runs Jest tests in the server directory)

### Question 3: Running Both Client and Server
**Command:**
`npm run dev` (uses `concurrently` to run both client and server)

### Question 4: Syntax Highlighting
**Library:**
`@monaco-editor/react`

### Question 5: Code Execution
**Library:**
`pyodide` (loaded via CDN for Python execution in browser)

### Question 6: Containerization
**Base Image:**
`node:18-alpine`

### Question 7: Deployment
**Service:**
Render (or similar container hosting service)

## How to Run

1. Install dependencies:
   ```bash
   npm install
   cd client && npm install
   cd ../server && npm install
   ```

2. Run the application:
   ```bash
   npm run dev
   ```

3. Run with Docker:
   ```bash
   docker-compose up --build
   ```
