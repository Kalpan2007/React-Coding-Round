/**
 * 1. Write a Node.js script to print "Hello, World!" to the console.
 * Command: node backend_practice.js
 */
console.log("1. Hello, World!");

/**
 * 2. Create a Node.js script to add two numbers and print the result.
 */
const num1 = 5;
const num2 = 7;
console.log("2. Sum is:", num1 + num2);

/**
 * 3. Write a script to read a file and print its content.
 * Command: node backend_practice.js (ensure 'sample.txt' exists)
 */
const fs = require('fs');
const filePath = 'sample.txt';
if (fs.existsSync(filePath)) {
  const content = fs.readFileSync(filePath, 'utf-8');
  console.log("3. File content:", content);
} else {
  console.log("3. sample.txt file not found.");
}

/**
 * 4. Write a Node.js script to create a simple GET API using Express.
 * Folder: express_app
 * Commands:
 *    npm init -y
 *    npm install express
 */
const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/hello', (req, res) => {
  res.send('4. Hello from Express GET API!');
});

/**
 * 5. Create a POST API that takes two numbers and returns their sum.
 * Endpoint: POST /add
 * Body: { "a": 5, "b": 10 }
 */
app.post('/add', (req, res) => {
  const { a, b } = req.body;
  const sum = a + b;
  res.send(`5. Sum is: ${sum}`);
});

/**
 * 6. Write an API endpoint that returns a “404 Not Found” error for invalid routes.
 */
app.use((req, res) => {
  res.status(404).send('6. 404 Not Found');
});

/**
 * 7. Create a Node.js script to serve an HTML file using Express.
 * Create 'index.html' in the same folder.
 */
app.get('/html', (req, res) => {
  res.sendFile(__dirname + '/index.html'); // Make sure index.html exists
});

/**
 * 8. Implement a login simulation using a hardcoded username and password.
 * Endpoint: POST /login
 * Body: { "username": "admin", "password": "1234" }
 */
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === '1234') {
    res.send('8. Login successful!');
  } else {
    res.status(401).send('8. Invalid credentials.');
  }
});

/**
 * 9. Write a Node.js script to log all incoming API requests to the console.
 */
app.use((req, res, next) => {
  console.log(`9. ${req.method} ${req.url}`);
  next();
});

/**
 * 10. Create a simple microservice that returns current server time.
 * Endpoint: GET /time
 */
app.get('/time', (req, res) => {
  const currentTime = new Date().toLocaleString();
  res.json({ message: '10. Server Time', time: currentTime });
});

/**
 * 11. Write a script to fetch data from a public API and display it in JSON format.
 * Using 'axios' library
 * Command: npm install axios
 */
const axios = require('axios');

async function fetchPublicAPI() {
  try {
    const response = await axios.get('https://api.github.com/users/octocat');
    console.log('11. Fetched Data:', response.data);
  } catch (error) {
    console.error('11. Error fetching data:', error.message);
  }
}
fetchPublicAPI();

/**
 * 12. Create a script to connect to MongoDB using Mongoose.
 * Command:
 *    npm install mongoose
 */
const mongoose = require('mongoose');
const MONGO_URI = 'mongodb://127.0.0.1:27017/testdb'; // Update as needed

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("12. Connected to MongoDB"))
  .catch(err => console.error("12. MongoDB connection error:", err));

/**
 * 13. Write a function to hash a password using bcrypt.
 * Command: npm install bcrypt
 */
const bcrypt = require('bcrypt');

async function hashPassword(password) {
  const saltRounds = 10;
  const hashed = await bcrypt.hash(password, saltRounds);
  console.log("13. Hashed Password:", hashed);
}
hashPassword("myPassword123");

/**
 * 14. Implement a basic JWT authentication system for an API.
 * Command: npm install jsonwebtoken
 * Endpoint: POST /jwt-login | GET /protected
 */
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'secret123';

app.post('/jwt-login', (req, res) => {
  const { username } = req.body;
  const token = jwt.sign({ user: username }, SECRET_KEY, { expiresIn: '1h' });
  res.json({ message: "14. JWT Token Generated", token });
});

app.get('/protected', (req, res) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).send("14. Token missing.");

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(401).send("14. Invalid token.");
    res.send(`14. Hello ${decoded.user}, you're authorized!`);
  });
});

/**
 * Start the Express server (required for API testing)
 */
app.listen(PORT, () => {
  console.log(`\nServer running on http://localhost:${PORT}`);
});
