// server to for dealing with http requests
const express = require('express');
// local path resolver
const path =  require('path');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User =  require('./model/user');
const configObj = require('./config/config');
try {
  mongoose.connect(configObj.CONNECTION_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
  });
} catch (error) {
  console.log(error);
}

const app = express();

app.use('/', express.static(path.join(__dirname, 'static')));
// parses request body for JS usage
app.use(express.json());

app.listen(9999, () => {
  console.log('server is up and running');
});

app.post('/api/register', async (req, res) => {
  try {
    const {username, password: plainTextPassword } = req.body;
    const password = await bcrypt.hash(plainTextPassword, 10);
    // hash the password
    const result = await User.create({
      username,
      password
    });
    res.json({status: '200'});
  }catch (error) {
    console.log(error);
  }
});