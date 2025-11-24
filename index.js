const express = require('express');
const app = express();
app.use(express.json());

let users = [];
let nextId = 1;

app.get('/', (req, res) => res.json({ status: 'ok' }));

// List users
app.get('/users', (req, res) => {
  res.json(users);
});

// Get user by id
app.get('/users/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const user = users.find(u => u.id === id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

// Create user
app.post('/users', (req, res) => {
  const { name, email } = req.body;
  if (!name) return res.status(400).json({ error: 'name is required' });
  const user = { id: nextId++, name, email: email || null };
  users.push(user);
  res.status(201).json(user);
});

// Update user
app.put('/users/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const user = users.find(u => u.id === id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  const { name, email } = req.body;
  if (name !== undefined) user.name = name;
  if (email !== undefined) user.email = email;
  res.json(user);
});

// Delete user
app.delete('/users/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const idx = users.findIndex(u => u.id === id);
  if (idx === -1) return res.status(404).json({ error: 'User not found' });
  const removed = users.splice(idx, 1)[0];
  res.json(removed);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on ${port}`));
