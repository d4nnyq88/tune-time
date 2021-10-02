const sequelize = require('../config/connection');
const { User, Playlist } = require('../models');

const userData = require('./userData.json');
const playlistData = require('./playlistData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true});
 
  const users= await User.create(userData);

  const playlists= await Playlist.create(playlistData);
  
  process.exit(0);
};

seedDatabase();