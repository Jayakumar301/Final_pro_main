import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';

// Initialize app and middleware
const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' })); // Increase payload limit to 10MB
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// MongoDB URI (replace with your actual URI)
const mongoURI = 'mongodb://localhost:27017/FacultyDatabase';

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true,upsert: true })
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.log('Error connecting to MongoDB:', err));

// Create schema for PartA data
const partADataSchema = new mongoose.Schema({
  name: String,
  postHeld: String,
  id:
  { 
    type: String,
    required: true,
    unique: true,
    primaryKey: true // Set the employeeId field as a primary key
  },
  appointmentDate: Date,
  address: String,
  contact: String,
  email: String,
  department: String,
  category: String,
  educationRows: Array,
  experienceRows: Array,
  selfScore: { type: Number, default: 0 }, // New field for selfScore
  dfacScore: { type: Number, default: 0 }  // New field for dfacScore
  
});

// Create schema for PartB data
const partBDataSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  rows1: { data: Array, selfScore: Number, dfacScore: Number},
  rows2: { data: Array, selfScore: Number, dfacScore: Number },
  rows3: { data: Array, selfScore: Number, dfacScore: Number },
  rows4: { data: Array, selfScore: Number, dfacScore: Number },
  rows5: { data: Array, selfScore: Number, dfacScore: Number },
  rows6: { data: Array, selfScore: Number, dfacScore: Number },
  rows7: { data: Array, selfScore: Number, dfacScore: Number },
  rows8: { data: Array, selfScore: Number, dfacScore: Number },
  rows9: { data: Array, selfScore: Number, dfacScore: Number },
  rows10: { data: Array, selfScore: Number, dfacScore: Number },
  rows11: { data: Array, selfScore: Number, dfacScore: Number },
  rows12: { data: Array, selfScore: Number, dfacScore: Number },
  rows13: { data: Array, selfScore: Number, dfacScore: Number },
});

// Create schema for PartC data (adjust fields as needed)
const partCDataSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  rows1: {
    data: [
      {
        sNo: Number,
        membership: String,
        score: Number,
        dfac: String,
      },
    ],
    selfScore: Number,
    dfacScore: Number,
  },
  rows2: { data: Array, selfScore: Number, dfacScore: Number },
  rows3: { data: Array, selfScore: Number, dfacScore: Number },
  rows4: { data: Array, selfScore: Number, dfacScore: Number },
  rows5: { data: Array, selfScore: Number, dfacScore: Number },
  rows6: { data: Array, selfScore: Number, dfacScore: Number },
  rows7: { data: Array, selfScore: Number, dfacScore: Number },
  rows8: { data: Array, selfScore: Number, dfacScore: Number },
  rows9: { data: Array, selfScore: Number, dfacScore: Number },
  rows10: { data: Array, selfScore: Number, dfacScore: Number },
});

// Create schema for PartD data (adjust fields as needed)
const partDDataSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  rows1: { data: Array, selfScore: Number, dfacScore: Number,},
  rows2: { data: Array, selfScore: Number, dfacScore: Number },
  rows3: { data: Array, selfScore: Number, dfacScore: Number },
  rows4: { data: Array, selfScore: Number, dfacScore: Number },
  rows5: { data: Array, selfScore: Number, dfacScore: Number },
  rows6: { data: Array, selfScore: Number, dfacScore: Number },
  rows7: { data: Array, selfScore: Number, dfacScore: Number },
  rows8: { data: Array, selfScore: Number, dfacScore: Number },
});

// Create schema for PartE data (adjust fields as needed)
const partEDataSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  rowsTable1: { data: Array, selfScore: Number, dfacScore: Number},
  rowsTable2: { data: Array, selfScore: Number, dfacScore: Number },
  rowsTable3: { data: Array, selfScore: Number, dfacScore: Number },
  rowsTable4: { data: Array, selfScore: Number, dfacScore: Number },
  rowsTable5: { data: Array, selfScore: Number, dfacScore: Number },
});


// Create schema for PartF data (adjust fields as needed)
const partFDataSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    primaryKey: true // Set the ID field as a primary key
  },
  rows: Array
});

// Create schema for User data (for login)
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
    
  },
  password: {
    type: String,
    required: true,
  },
});

// Create schema for Profile data
const profileSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    primaryKey: true // Set the ID field as a primary key
  },
  username: String,
  name: String,
  gmail: String,
  phone: String,
  address: String,
  photo: String
});


const User = mongoose.model('User', userSchema);
const Profile = mongoose.model('Profile', profileSchema);

// Create models from schemas
const PartAData = mongoose.model("PartAData", partADataSchema);
const PartBData = mongoose.model("PartBData", partBDataSchema);
const PartCData = mongoose.model("PartCData", partCDataSchema);
const PartDData = mongoose.model("PartDData", partDDataSchema);
const PartEData = mongoose.model("PartEData", partEDataSchema);
const PartFData = mongoose.model("PartFData", partFDataSchema);

// Endpoint to save PartA data (prevent duplicates)
app.post('/save-parta-data', async (req, res) => {
  try {
    const { id, selfScore, dfacScore } = req.body;
    const existingRecord = await PartAData.findOne({ id });

    if (existingRecord) {
      await PartAData.updateOne({ id }, { $set: req.body }, { upsert: true });
      return res.send({ message: 'PartA data updated successfully' });
    } else {
      const partAData = new PartAData({ ...req.body, selfScore, dfacScore });
      await partAData.save();
      return res.send({ message: 'PartA data saved successfully' });
    }
  } catch (err) {
    console.error('Error saving PartA data:', err);
    res.status(500).send({ message: 'Error saving PartA data', error: err });
  }
});


// Apply the same logic for other parts (B, C, D, E, F)

// Endpoint to save PartB data (prevent duplicates)
app.post('/save-partb-data', async (req, res) => {
  const { id, ...data } = req.body;

  if (!id) {
    return res.status(400).send({ message: 'Profile ID is required' });
  }

  try {
    const existingRecord = await PartBData.findOne({ id });

    if (existingRecord) {
      await PartBData.updateOne({ id }, { $set: data });
      res.send({ message: 'PartB data updated successfully' });
    } else {
      const partBData = new PartBData({ id, ...data });
      await partBData.save();
      res.send({ message: 'PartB data saved successfully' });
    }
  } catch (error) {
    console.error('Error saving PartB data:', error);
    res.status(500).send({ message: 'Error saving PartB data', error });
  }
});


// Endpoint to save PartC data (prevent duplicates)
app.post('/save-partc-data', async (req, res) => {
  const { id, ...data } = req.body;

  if (!id) {
    return res.status(400).send({ message: 'Profile ID is required' });
  }

  try {
    const existingRecord = await PartCData.findOne({ id });

    if (existingRecord) {
      await PartCData.updateOne({ id }, { $set: data });
      res.send({ message: 'PartC data updated successfully' });
    } else {
      const partCData = new PartCData({ id, ...data });
      await partCData.save();
      res.send({ message: 'PartC data saved successfully' });
    }
  } catch (error) {
    console.error('Error saving PartC data:', error);
    res.status(500).send({ message: 'Error saving PartC data', error });
  }
});


// Endpoint to save PartD data (prevent duplicates)
app.post('/save-partd-data', async (req, res) => {
  const { id, ...data } = req.body;

  if (!id) {
    return res.status(400).send({ message: 'Profile ID is required' });
  }

  try {
    const existingRecord = await PartDData.findOne({ id });

    if (existingRecord) {
      await PartDData.updateOne({ id }, { $set: data });
      res.send({ message: 'PartD data updated successfully' });
    } else {
      const partDData = new PartDData({ id, ...data });
      await partDData.save();
      res.send({ message: 'PartD data saved successfully' });
    }
  } catch (error) {
    console.error('Error saving PartD data:', error);
    res.status(500).send({ message: 'Error saving PartD data', error });
  }
});

// Endpoint to save PartE data (prevent duplicates)
app.post('/save-parte-data', async (req, res) => {
  const { id, ...data } = req.body;

  if (!id) {
    return res.status(400).send({ message: 'Profile ID is required' });
  }

  try {
    const existingRecord = await PartEData.findOne({ id });

    if (existingRecord) {
      await PartEData.updateOne({ id }, { $set: data });
      res.send({ message: 'PartE data updated successfully' });
    } else {
      const partEData = new PartEData({ id, ...data });
      await partEData.save();
      res.send({ message: 'PartE data saved successfully' });
    }
  } catch (error) {
    console.error('Error saving PartE data:', error);
    res.status(500).send({ message: 'Error saving PartE data', error });
  }
});

// Endpoint to save PartF data (prevent duplicates)
app.post('/save-partf-data', async (req, res) => {
  try {
    const { id } = req.body;
    const existingRecord = await PartFData.findOne({ id });
    if (existingRecord) {
      await PartFData.updateOne({ id }, { $set: req.body });
      res.send({ message: 'PartF data updated successfully' });
    } else {
      const partFData = new PartFData(req.body);
      await partFData.save();
      res.send({ message: 'PartF data saved successfully' });
    }
  } catch (err) {
    res.status(500).send({ message: 'Error saving PartF data', error: err });
  }
});

// Endpoint to save profile data
app.post('/save-profile', async (req, res) => {
  const { id, ...profile } = req.body;
  try {
    const existingProfile = await Profile.findOne({ id });
    if (existingProfile) {
      await Profile.updateOne({ id }, { $set: profile });
      res.send({ message: 'Profile updated successfully' });
    } else {
      const profileData = new Profile({ id, ...profile });
      await profileData.save();
      res.send({ message: 'Profile saved successfully' });
    }
  } catch (err) {
    res.status(500).send({ message: 'Error saving profile', error: err });
  }
});

// Endpoint to get profile data
app.get('/get-profile', async (req, res) => {
  const { username } = req.query;
  try {
    const profile = await Profile.findOne({ id: username });
    if (profile) {
      res.send(profile);
    } else {
      res.status(404).send({ message: 'Profile not found' });
    }
  } catch (err) {
    res.status(500).send({ message: 'Error fetching profile', error: err });
  }
});

// Login endpoint
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username, password });
    if (user) {
      res.status(200).send({ message: 'Login successful' });
    } else {
      res.status(401).send({ message: 'Invalid username or password' });
    }
  } catch (error) {
    res.status(500).send({ message: 'Server error. Please try again later.', error });
  }
});

// Endpoint to change password
app.post('/change-password', async (req, res) => {
  const { username, oldPassword, newPassword } = req.body;
  try {
    const user = await User.findOne({ username, password: oldPassword });
    if (user) {
      await User.updateOne({ username }, { $set: { password: newPassword } });
      res.send({ success: true, message: 'Password changed successfully' });
    } else {
      res.send({ success: false, message: 'Old password is incorrect' });
    }
  } catch (err) {
    res.status(500).send({ message: 'Error changing password', error: err });
  }
});

// Endpoint to get data for a specific user
app.get('/get-user-data', async (req, res) => {
  try {
    const { id } = req.query;

    const partAData = await PartAData.findOne({ id });
    const partBData = await PartBData.findOne({ id });
    const partCData = await PartCData.findOne({ id });
    const partDData = await PartDData.findOne({ id });
    const partEData = await PartEData.findOne({ id });
    const partFData = await PartFData.findOne({ id });

    const userData = {
      partA: partAData,
      partB: partBData,
      partC: partCData,
      partD: partDData,
      partE: partEData,
      partF: partFData,
    };

    res.send(userData);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching user data', error });
  }
});


// Endpoint to get profile ID
app.get('/get-profile-id', async (req, res) => {
  try {
    const profileId = req.query.id; // Assuming profile ID is passed as a query parameter
    if (!profileId) {
      return res.status(400).send('Profile ID is required');
    }

    const profile = await Profile.findOne({ id: profileId });
    if (!profile) {
      return res.status(404).send('Profile not found');
    }

    res.json({ id: profile.id });
  } catch (error) {
    console.error('Error fetching profile ID:', error);
    res.status(500).send('Server error');
  }
});

// Start the server on a port
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));