const mongoose = require('mongoose');
const { Schema } = mongoose;

const usersSchema = new Schema({
  userName: String,
  firstName: String,
  lastName: String,
  password: String,
  likedPosts: [{postId: String}],
  dislikedPosts: [{postId: String}],
});

const Users = mongoose.model('Users', usersSchema)

module.exports = { Users }