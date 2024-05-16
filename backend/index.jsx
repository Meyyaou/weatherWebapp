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
 
  alerteEnabled: {
    type: Boolean,
    required: false,
  },
});
const AdviceSchema = new mongoose.Schema({  
  type: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  weather: {
    type: String,
    required: true,
  },
  })
const User = mongoose.model('users', UserSchema);
const AdviceModel= mongoose.model("advices", AdviceSchema);
module.exports = AdviceModel;
mongoose.connect('mongodb://localhost:27017/weather', {
  useNewUrlParser: true,
  useUnifiedTopology: true
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
      let result = await user.save();
      result = result.toObject();
      if (result) {
        delete result.password;
        res.status(201).send(result); // Envoyer les données de l'utilisateur enregistré
        console.log(result);
      } else {
        console.log('User already registered');
        res.status(400).send('User already registered');
      }
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).send('Something went wrong');
    }
  });

  app.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Recherche de l'utilisateur par son email dans la base de données
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).send('User not found');
      }
  
      // Comparaison des mots de passe
      const isPasswordValid = password === user.password;
      if (!isPasswordValid) {
        return res.status(401).send('Invalid email or password');
      }
  
      // Authentification réussie : renvoyer les informations de l'utilisateur
      const { name, type, alerteEnabled } = user;
      res.status(200).json({ name, type, alerteEnabled });
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).send('Something went wrong');
    }
  });
  app.post('/updatePassword', async (req, res) => {
    try {
      const { userId, newPassword } = req.body;
  
      // Recherche de l'utilisateur par son ID dans la base de données
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).send('User not found');
      }
  
      // Mettre à jour le mot de passe de l'utilisateur
      user.password = newPassword;
      await user.save();
  
      res.status(200).send('Password updated successfully');
    } catch (error) {
      console.error('Error updating password:', error);
      res.status(500).send('Something went wrong');
    }
  });
  app.post('/updateType', async (req, res) => {
    try {
      const { userId, type } = req.body;
  
      // Recherche de l'utilisateur par son ID dans la base de données
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).send('User not found');
      }
  
      // Mettre à jour le type de l'utilisateur
      user.type = type;
      await user.save();
  
      res.status(200).send('Type updated successfully');
    } catch (error) {
      console.error('Error updating type:', error);
      res.status(500).send('Something went wrong');
    }
  });
  app.post('/updateAlertEnabled', async (req, res) => {
    try {
      const { userId, alertEnabled } = req.body;
  
      // Recherche de l'utilisateur par son ID dans la base de données
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).send('User not found');
      }
  
      // Mettre à jour l'état des alertes de l'utilisateur
      user.alerteEnabled = alertEnabled;
      await user.save();
  
      res.status(200).send('Alert state updated successfully');
    } catch (error) {
      console.error('Error updating alert state:', error);
      res.status(500).send('Something went wrong');
    }
  });

  app.get('/randomAdvice/:type', async (req, res) => {

    try {
      const randomAdvice = await AdviceModel.find({
        type: req.params.type
      });
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
