const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactScheme = new Schema({
  nama: String,
  umur: Number,
  telp: String
})

const Blog = mongoose.model('Contact', contactScheme);

module.exports = Blog;
