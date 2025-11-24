# simple-js-backend

A tiny Express backend with in-memory CRUD operations for `users`.

## Run

Open a PowerShell terminal in the project folder and run:

```powershell
npm install
npm start
```

The server listens on port 3000 by default.

## API

- GET /            -> health check
- GET /users       -> list users
- GET /users/:id   -> get user
- POST /users      -> create user (JSON body: { name, email? })
- PUT /users/:id   -> update user (JSON body: { name?, email? })
- DELETE /users/:id-> delete user

Example create using PowerShell:

```powershell
Invoke-RestMethod -Method Post -Uri http://localhost:3000/users -Body (@{name='Alice'; email='a@a.com'} | ConvertTo-Json) -ContentType 'application/json'
```
