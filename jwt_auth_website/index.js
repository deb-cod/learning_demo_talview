
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import path from 'path';


import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);




const app = express();
const secretKey = 'I am Ausm';

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
  const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1m' });
  // console.log(typeof(token));

  // const a = token //+ "TEST"

  // res.json({ "token": token+"_TEST" });
  res.json({ "token": token });
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
    // console.log("comparing: ",req.userId = decoded.userId);
    // console.log("This is req.userID ",req);
    // console.log("decoded: ",decoded)
    next();
  });
}
catch(error){
  res.json({message:error})
}
};

// Authenticated session endpoint
app.get('/authenticated_session', verifyToken, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'authenticated_session.html'));
  // res.json({ message: 'Authenticated session' });
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
