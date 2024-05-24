const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  alerts: {
    type: String,
    required: true,
  },
});

const User = mongoose.model('users', UserSchema);

mongoose.connect('mongodb://localhost:27017/weather', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
  startServer();
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

function startServer() {
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.get('/', (req, res) => {
    res.send('App is Working');
  });

  app.post('/register', async (req, res) => {
    try {
      const user = new User(req.body);
      await user.validate();
      let result = await user.save();
      result = result.toObject();
      if (result) {
        delete result.password;
        res.status(201).json(result);
      } else {
        res.status(400).json({ error: 'User already registered' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const isPasswordValid = password === user.password;
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      const {_id,name,type,alerts,email: userEmail,password:userPassword} = user;
      res.status(200).json({_id, name, type, alerts,email: userEmail,password:userPassword });
    } catch (error) {
      res.status(500).json({ error: 'Something went wrong' });
    }
  });

  app.put('/updateUserByEmail/:email', async (req, res) => {
    try {
      const userEmail = req.params.email;
      const updatedData = req.body;
  
      const result = await User.findOneAndUpdate({ email: userEmail }, updatedData, { new: true });
  
      if (!result) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: 'Something went wrong' });
    }
  });
  app.get('/randomAdvice/:type', async (req, res) => {
    const adviceType = req.params.type;
    const weatherState = req.query.weatherState;
  
    if (!adviceType) {
      return res.status(400).json({ message: 'Advice type is required' });
    }
  
    try {
      const query = { type: adviceType };
      if (weatherState) {
        query.weather = weatherState;
      }
  
      const advices = await AdviceModel.find(query);
      if (advices.length === 0) {
        return res.status(404).json({ message: 'No advice found' });
      }
  
      const randomAdvice = advices[Math.floor(Math.random() * advices.length)];
      res.status(200).json(randomAdvice);
    } catch (error) {
      console.error('Error fetching random advice:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  const PORT = 5000;
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
}

/**  */