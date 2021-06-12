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

app.post('/api/register', async (req, res) => {
  try {
    const {username, password: plainTextPassword } = req.body;
    // 1. username, password check
    if(!username ||  typeof username !== 'string') res.json({status: 'error', message: 'Invalid username.'});
    if(!plainTextPassword ||  typeof plainTextPassword !== 'string') res.json({status: 'error', message: 'Invalid password.'});
    // 2. add password validation like minimum characters, letters etc.

    // 3. Encrypt password as the username and password are validated.
    const password = await bcrypt.hash(plainTextPassword, 10);
    // 4. create user document in collection
    const result = await User.create({
      username,
      password
    });
    res.json({status: 'success'});
  }catch (error) {
    if (error.code === 11000) {
      res.json({status: 'error', message: 'Username already in use'});
    }
    else {
      console.log(error);
    }
  }
});

app.listen(9999, () => {
  console.log('server is up and running');
});