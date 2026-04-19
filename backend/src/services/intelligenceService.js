const Intelligence = require('../models/Intelligence');

exports.getAllIntelligence = async (filters = {}) => {
  const query = {};
  
  if (filters.sourceType) {
    query.sourceType = filters.sourceType;
  }
  
  if (filters.classification) {
    query.classification = filters.classification;
  }

  // Geo-Search using $near if coordinates are provided
  if (filters.lng && filters.lat && filters.maxDistance) {
    query.location = {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [parseFloat(filters.lng), parseFloat(filters.lat)]
        },
        $maxDistance: parseInt(filters.maxDistance) // in meters
      }
    };
  }

  // Sort by newest first
  return await Intelligence.find(query).sort({ timestamp: -1 });
};

exports.createIntelligence = async (data) => {
  const intel = new Intelligence(data);
  return await intel.save();
};
