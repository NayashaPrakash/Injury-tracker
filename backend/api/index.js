// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
// const config = require('./config');

// MongoDB connection
// mongoose
//   .connect('mongodb://localhost:27017/Lief', { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('Connected to MongoDB'))
//   .catch((err) => console.error('Error connecting to MongoDB:', err));


// mongoose.connect('mongodb+srv://injury-tracker-user:injury-tracker-user@cluster0.nf0k5fr.mongodb.net/?retryWrites=true&w=majority');

const crypto = require('crypto');
const secretKey = crypto.randomBytes(32).toString('base64');
console.log(secretKey);


mongoose
  .connect(
     'mongodb+srv://injury-tracker-user:injury-tracker-user@cluster0.nf0k5fr.mongodb.net/injury-tracker-app?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Database Connection Done");
  })
  .catch(() => {
    console.log(error);
    console.log("Error in establishing Database");
  });

app.use(bodyParser.json());
app.use(
  cors({
    origin: [
      'https://injury-tracker-frontend-549r1hkzo-nayashas-projects.vercel.app',
      'https://injury-tracker-frontend.vercel.app',
      'https://injury-tracker.vercel.app'
    ],
    methods: ['GET', 'POST', 'OPTIONS'],
    credentials: true 
  })
);

// app.use(cors());


const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  username: String
});

const User = mongoose.model('User', userSchema);

const formDataSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  username: String,
  firstName: String,
  email: String,
  date: String,
  time: String,
  mobile: String,
  gender: String, // Add the 'gender' field
  inputValues: Object
});

const FormData = mongoose.model('FormData', formDataSchema);

// Update the /api/saveFormData route to save the merged form data
app.post('/api/saveFormData', async (req, res) => {
  try {
    const formData = new FormData(req.body);

    await formData.save();

    res.status(200).send('Form data saved successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error saving data');
  }
});

app.post('/api/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user document
    const newUser = new User({
      username,
      email,
      password: hashedPassword
    });

    await newUser.save();

    const token = jwt.sign({ user: newUser._id }, secretKey);

    res.status(201).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    const token = jwt.sign({ user: user._id }, secretKey);

    // Successful login
    res.status(200).json({ token, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

const verifyToken = (req, res, next) => {
  //   const token = req.headers.authorization;
  const token = req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access denied' });
  }

  try {
    const decodedToken = jwt.verify(token, secretKey);
    const { exp } = decodedToken;
    const currentTime = Date.now() / 1000;

    if (exp < currentTime) {
      return res.status(401).json({ message: 'Token has expired' });
    }
    req.userData = decodedToken;

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

app.get('/api/myForms', verifyToken, async (req, res) => {
  try {
    const userId = req.userData.user;
    const forms = await FormData.find({ userId });
    res.status(200).json({ forms });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching form data' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
