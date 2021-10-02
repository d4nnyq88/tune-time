const sequelize = require('../config/connection');
const { User, Playlist } = require('../models');

const userData = require('./userData.json');
const playlistData = require('./playlistData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const user= await User.create(userData, {
    individualHooks: true,
    returning: true,
  });

  const playList= await Playlist.create(playlistData);
  
  process.exit(0);
};

seedDatabase();