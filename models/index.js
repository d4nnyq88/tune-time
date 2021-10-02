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

// Playlist.hasOne(Songlist,{
//   foreignKey: "playlist_id",
//   onDelete: 'CASCADE',
// });

// Songlist.belongsTo(Playlist,{
//   foreignKey: "playlist_id"
// });

module.exports = { User, Playlist, Songlist };