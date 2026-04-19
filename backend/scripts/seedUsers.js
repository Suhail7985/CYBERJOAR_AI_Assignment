const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../src/models/User');

dotenv.config();

const users = [
  {
    name: 'Commander Sarah',
    email: 'commander@cyberjoar.ai',
    password: 'commander123',
    role: 'Commander'
  },
  {
    name: 'Analyst Mark',
    email: 'analyst@cyberjoar.ai',
    password: 'analyst123',
    role: 'Analyst'
  },
  {
    name: 'Agent James',
    email: 'agent@cyberjoar.ai',
    password: 'agent123',
    role: 'Field Agent'
  }
];

const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    // Clear existing users to avoid duplicates during seeding
    await User.deleteMany({ email: { $in: users.map(u => u.email) } });
    
    await User.create(users);
    
    console.log('Demo agents successfully initialized in database.');
    process.exit();
  } catch (err) {
    console.error('Seeding failed:', err);
    process.exit(1);
  }
};

seedUsers();
