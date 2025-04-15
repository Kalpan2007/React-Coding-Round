// Task 1: Simple Express Server
// --------------------------------------
// Dependencies: express
// Install: npm install express

const express = require("express");
const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));


// Task 2: GET All Users
// --------------------------------------
const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
];

app.get("/users", (req, res) => {
  res.json(users);
});


// Task 3: POST New User
// --------------------------------------
// Middleware needed: express.json()

app.use(express.json());

app.post("/users", (req, res) => {
  const newUser = req.body;
  users.push(newUser);
  res.status(201).json(newUser);
});


// Task 4: GET User by ID
// --------------------------------------
app.get("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find((u) => u.id === id);
  if (user) res.json(user);
  else res.status(404).json({ message: "User not found" });
});


// Task 5: PUT to Update Entire User
// --------------------------------------
app.put("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = users.findIndex((u) => u.id === id);
  if (index !== -1) {
    users[index] = req.body;
    res.json(users[index]);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});


// Task 6: PATCH to Partially Update User
// --------------------------------------
app.patch("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find((u) => u.id === id);
  if (user) {
    Object.assign(user, req.body);
    res.json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});


// Task 7: DELETE a User
// --------------------------------------
app.delete("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = users.findIndex((u) => u.id === id);
  if (index !== -1) {
    users.splice(index, 1);
    res.sendStatus(204);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});


// Task 8: JWT Authentication - Login Route
// --------------------------------------
// Dependencies: jsonwebtoken, dotenv
// Install: npm install jsonwebtoken dotenv

require("dotenv").config();
const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.JWT_SECRET || "mysecret";

const dummyUser = {
  id: 1,
  username: "admin",
  password: "password",
};

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === dummyUser.username && password === dummyUser.password) {
    const token = jwt.sign({ id: dummyUser.id, username: dummyUser.username }, SECRET_KEY, { expiresIn: "1h" });
    res.json({ token });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});


// Task 9: Middleware to Protect Private Routes
// --------------------------------------
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

app.get("/private", authenticateToken, (req, res) => {
  res.json({ message: "This is a protected route", user: req.user });
});


// Task 10: Role-Based Authorization
// --------------------------------------
const dummyAdmin = {
  id: 1,
  username: "admin",
  password: "admin123",
  role: "admin",
};

app.post("/role-login", (req, res) => {
  const { username, password } = req.body;
  if (username === dummyAdmin.username && password === dummyAdmin.password) {
    const token = jwt.sign({ id: dummyAdmin.id, username: dummyAdmin.username, role: dummyAdmin.role }, SECRET_KEY);
    res.json({ token });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

function authorizeRole(role) {
  return (req, res, next) => {
    if (req.user.role !== role) return res.sendStatus(403);
    next();
  };
}

app.get("/admin", authenticateToken, authorizeRole("admin"), (req, res) => {
  res.json({ message: "Welcome Admin!" });
});


// Task 11: REST API for Products (CRUD)
// --------------------------------------
// File: productRoutes.js, productController.js (see modular structure in Task 12)
// Dependencies: express
// Install: npm install express

// productController.js
const products = [
    { id: 1, name: "Product A" },
    { id: 2, name: "Product B" },
  ];
  
  exports.getProducts = (req, res) => {
    res.json(products);
  };
  
  exports.createProduct = (req, res) => {
    const newProduct = req.body;
    products.push(newProduct);
    res.status(201).json(newProduct);
  };
  
  exports.updateProduct = (req, res) => {
    const id = parseInt(req.params.id);
    const index = products.findIndex(p => p.id === id);
    if (index !== -1) {
      products[index] = req.body;
      res.json(products[index]);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  };
  
  exports.deleteProduct = (req, res) => {
    const id = parseInt(req.params.id);
    const index = products.findIndex(p => p.id === id);
    if (index !== -1) {
      products.splice(index, 1);
      res.sendStatus(204);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  };
  
  
  // Task 12: Use Express Router in Modules
  // --------------------------------------
  // File: routes/productRoutes.js
  const express = require("express");
  const router = express.Router();
  const controller = require("../controllers/productController");
  
  router.get("/", controller.getProducts);
  router.post("/", controller.createProduct);
  router.put("/:id", controller.updateProduct);
  router.delete("/:id", controller.deleteProduct);
  
  module.exports = router;
  
  
  // Task 13: Pagination for GET /users
  // --------------------------------------
  app.get("/paginated-users", (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedUsers = users.slice(startIndex, endIndex);
    res.json(paginatedUsers);
  });
  
  
  // Task 14: Sort or Filter Users by Query
  // --------------------------------------
  app.get("/filtered-users", (req, res) => {
    let filtered = [...users];
    const { role, sortBy } = req.query;
  
    if (role) filtered = filtered.filter(u => u.role === role);
    if (sortBy) filtered.sort((a, b) => a[sortBy].localeCompare(b[sortBy]));
  
    res.json(filtered);
  });
  
  
  // Task 15: Rate Limiting Middleware
  // --------------------------------------
  const rateLimit = {};
  
  app.use((req, res, next) => {
    const ip = req.ip;
    const now = Date.now();
  
    if (!rateLimit[ip]) {
      rateLimit[ip] = [];
    }
  
    rateLimit[ip] = rateLimit[ip].filter(timestamp => now - timestamp < 3600000);
    rateLimit[ip].push(now);
  
    if (rateLimit[ip].length > 100) {
      res.status(429).json({ message: "Too many requests" });
    } else {
      next();
    }
  });
  
  
  // Task 16: Register with Bcrypt + Validation
  // --------------------------------------
  // Dependencies: bcrypt
  // Install: npm install bcrypt
  
  const bcrypt = require("bcrypt");
  
  app.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password || password.length < 6)
      return res.status(400).json({ message: "Invalid input" });
  
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ id: users.length + 1, name, email, password: hashedPassword });
    res.status(201).json({ message: "User registered" });
  });
  
  
  // Task 17: Express Error Handling Middleware
  // --------------------------------------
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({ message: err.message || "Server Error" });
  });
  
  
  // Task 18: OAuth 2.0 Flow Explanation (Mock Route)
  // --------------------------------------
  app.post("/oauth-login", (req, res) => {
    const { access_token } = req.body;
    if (access_token === "valid-token") {
      res.json({ message: "OAuth Login successful" });
    } else {
      res.status(401).json({ message: "Invalid token" });
    }
  });
  
  
  // Task 19: Protected Route with Roles and JWT
  // --------------------------------------
  app.post("/role-login", (req, res) => {
    const { username, password } = req.body;
    if (username === "admin" && password === "admin123") {
      const token = jwt.sign({ username, role: "admin" }, SECRET_KEY);
      res.json({ token });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  });
  
  app.get("/role-admin", authenticateToken, authorizeRole("admin"), (req, res) => {
    res.json({ message: "Welcome Admin with Role!" });
  });
  
  
  // Task 20: Modular Folder Structure for API
  // --------------------------------------
  // Folder Structure:
  // - app.js
  // - routes/userRoutes.js
  // - controllers/userController.js
  
  // app.js will include:
  // const userRoutes = require("./routes/userRoutes");
  // app.use("/users", userRoutes);
  
  
  // Task 21: Upload a File Using multer
  // --------------------------------------
  // Dependencies: multer
  // Install: npm install multer
  
  const multer = require("multer");
  const upload = multer({ dest: "uploads/" });
  
  app.post("/upload", upload.single("file"), (req, res) => {
    res.json({ message: "File uploaded successfully", file: req.file });
  });
  
  
  // Task 22: Logging Middleware
  // --------------------------------------
  app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
  });
  