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
  rows1: { data: Array, selfScore: Number, dfacScore: Number},
  rows2: { data: Array, selfScore: Number, dfacScore: Number },
  rows3: { data: Array, selfScore: Number, dfacScore: Number },
  rows4: { data: Array, selfScore: Number, dfacScore: Number },
  rows5: { data: Array, selfScore: Number, dfacScore: Number },
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


// Admin Schema
const adminSchema = new mongoose.Schema({
  adminUsername: { type: String, required: true, unique: true }, // Updated field name
  adminPassword: { type: String, required: true }, // Updated field name
});
const Admin = mongoose.model('Admin', adminSchema);

// Admin Login Endpoint
app.post('/admin-login', async (req, res) => {
  const { adminUsername, adminPassword } = req.body; // Use updated field names

  try {
    const admin = await Admin.findOne({ adminUsername, adminPassword }); // Query using updated field names
    if (admin) {
      res.status(200).json({ success: true, message: 'Login successful' });
    } else {
      res.status(404).json({ success: false, message: 'No records found' });
    }
  } catch (error) {
    console.error('Error during admin login:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});


// Endpoint to fetch scoring data for all parts
app.post('/get-scoring-data', async (req, res) => {
  const { id } = req.body; // Extract `id` from the request body

  if (!id) {
    return res.status(400).send({ message: 'ID is required' });
  }

  try {
    // Fetch data from all parts collections
    const partAData = await PartAData.findOne({ id });
    const partBData = await PartBData.findOne({ id });
    const partCData = await PartCData.findOne({ id });
    const partDData = await PartDData.findOne({ id });
    const partEData = await PartEData.findOne({ id });

    // Check if any data exists for the given ID
    if (!partAData && !partBData && !partCData && !partDData && !partEData) {
      return res.status(404).send({ message: 'No data found for the provided ID' });
    }

    // Aggregate scores for each part and its tables
    const scores = {};

    if (partAData) {
      scores['Part A'] = {
        selfScore: partAData.selfScore || 0,
        dfacScore: partAData.dfacScore || 0,
      };
    }

    if (partBData) {
      scores['Part B'] = calculateTableScores(partBData, 13); // 13 tables in Part B
    }

    if (partCData) {
      scores['Part C'] = calculateTableScores(partCData, 10); // 10 tables in Part C
    }

    if (partDData) {
      scores['Part D'] = calculateTableScores(partDData, 8); // 8 tables in Part D
    }

    if (partEData) {
      scores['Part E'] = calculateTableScores(partEData, 5); // 5 tables in Part E
    }

    // Respond with aggregated scores
    res.status(200).send({ success: true, scores });
  } catch (error) {
    console.error('Error fetching scoring data:', error);
    res.status(500).send({ message: 'Server error', error });
  }
});

// Function to calculate table scores for a given part
function calculateTableScores(partData, tableCount) {
  const tables = {};
  for (let i = 1; i <= tableCount; i++) {
    const tableKey = `rows${i}`; // Key format for table data
    if (partData[tableKey]) {
      tables[`Table ${i}`] = {
        selfScore: partData[tableKey].selfScore || 0,
        dfacScore: partData[tableKey].dfacScore || 0,
      };
    }
  }
  return tables;
}


// Endpoint to update DFAC scores for all parts
// Endpoint to update DFAC scores for all parts and their tables
// Endpoint to update DFAC scores for all parts and their tables
app.post('/update-dfac-scores', async (req, res) => {
  const { id, updatedScores } = req.body;

  if (!id || !updatedScores || !Array.isArray(updatedScores)) {
    return res.status(400).send({ success: false, message: 'Invalid request payload.' });
  }

  try {
    // Loop through the updated scores for parts and their tables
    for (const { part, tables } of updatedScores) {
      if (part === 'Part A') {
        // Update Part A's overall DFAC score
        const dfacScore = tables[0]?.dfacScore || 0; // Part A does not have tables, so we take the first score
        await PartAData.updateOne({ id }, { $set: { dfacScore } });
      } else {
        // Update the specific tables for other parts
        for (const { table, dfacScore } of tables) {
          switch (part) {
            case 'Part B': {
              const tableKey = `rows${table.split(' ')[1]}`; // Extract table number (e.g., "Table 1")
              await PartBData.updateOne(
                { id },
                { $set: { [`${tableKey}.dfacScore`]: dfacScore } }
              );
              break;
            }
            case 'Part C': {
              const tableKey = `rows${table.split(' ')[1]}`;
              await PartCData.updateOne(
                { id },
                { $set: { [`${tableKey}.dfacScore`]: dfacScore } }
              );
              break;
            }
            case 'Part D': {
              const tableKey = `rows${table.split(' ')[1]}`;
              await PartDData.updateOne(
                { id },
                { $set: { [`${tableKey}.dfacScore`]: dfacScore } }
              );
              break;
            }
            case 'Part E': {
              const tableKey = `rowsTable${table.split(' ')[1]}`;
              await PartEData.updateOne(
                { id },
                { $set: { [`${tableKey}.dfacScore`]: dfacScore } }
              );
              break;
            }
            default: {
              console.warn(`Unknown part: ${part}`);
            }
          }
        }
      }
    }

    res.status(200).send({ success: true, message: 'DFAC scores updated successfully.' });
  } catch (error) {
    console.error('Error updating DFAC scores:', error);
    res.status(500).send({ success: false, message: 'Server error while updating scores.' });
  }
});



// Start the server on a port
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));