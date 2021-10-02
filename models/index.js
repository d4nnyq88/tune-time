const User = require('./User');
const Playlist = require('./Playlist');
const Songlist = require('./Songlist');

User.hasMany(Playlist, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Playlist.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Playlist, Songlist };