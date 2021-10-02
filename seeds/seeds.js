const sequelize = require('../config/connection');
const { User, Playlist } = require('../models');

const userData = require('./userData.json');
const playlistData = require('./playlistData.json');

const seedDatabase = () => {
 sequelize.sync({ force: true });

  User.create(userData, {
    individualHooks: true,
    returning: true,
  });

  Playlist.create(playlistData)

  process.exit(0);
};

seedDatabase();