const mongoose = require('mongoose');
const Intelligence = require('../src/models/Intelligence');
require('dotenv').config({ path: './.env' });

const seedData = [
  {
    title: "Unusual Border Movement detected",
    sourceType: "OSINT",
    classification: "CONFIDENTIAL",
    description: "Multiple social media reports suggest movement of unmarked convoys near the western perimeter. Corroborated by high-frequency chatter in local channels.",
    location: {
      type: "Point",
      coordinates: [75.8577, 26.9124] // Jaipur
    },
    timestamp: new Date()
  },
  {
    title: "Field Intelligence Report - Alpha Sector",
    sourceType: "HUMINT",
    classification: "SECRET",
    description: "Reliable source indicates supply chain disruption in the southern industrial zone. Primary focus on electronics manufacturing facilities.",
    location: {
      type: "Point",
      coordinates: [77.5946, 12.9716] // Bangalore
    },
    timestamp: new Date()
  },
  {
    title: "Satellite Capture: Thermal Anomaly",
    sourceType: "IMINT",
    classification: "TOP SECRET",
    description: "Sentinel-2 imagery shows significant thermal signatures in non-populated forest areas. Possible illegal industrial activity or covert setup.",
    location: {
      type: "Point",
      coordinates: [80.2707, 13.0827] // Chennai
    },
    timestamp: new Date()
  },
  {
    title: "Port Authority Log Discrepancy",
    sourceType: "OSINT",
    classification: "UNCLASSIFIED",
    description: "Public shipping logs show three vessels failing to report exit manifests. Destination unknown.",
    location: {
      type: "Point",
      coordinates: [72.8777, 19.0760] // Mumbai
    },
    timestamp: new Date()
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB for seeding...");
    
    await Intelligence.deleteMany({});
    console.log("Cleared existing data.");
    
    await Intelligence.insertMany(seedData);
    console.log("Seed data inserted successfully.");
    
    mongoose.connection.close();
    console.log("Connection closed.");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedDB();
