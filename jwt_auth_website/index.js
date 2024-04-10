const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const path = require('path');

const app = express();
const secretKey = 'your_secret_key';

// Middleware
app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));


app.get('/login', (req, res) => {
  
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


const users = [
  { id: 1, username: 'user', password: 'password' }
];

// Login endpoint
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username && u.password === password);

  if (!user) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  // Generate JWT token
  const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' });
  console.log(typeof(token));

  const a = token + "TEST"

  res.json({ a });
});

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  console.log(token);

  try{
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    req.userId = decoded.userId;
    next();
  });
}
catch(error){
  res.json({message:error})
}
};

// Authenticated session endpoint
app.get('/authenticated_session', verifyToken, (req, res) => {
  res.json({ message: 'Authenticated session' });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
