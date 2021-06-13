// server to for dealing with http requests
const express = require('express');
// local path resolver
const path =  require('path');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User =  require('./model/user');
const jwt = require('jsonwebtoken');
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

app.post('/api/login', async (req, res) => {
  const { username, password:plainTextPassword} = req.body;
  // validate the username is present
  // lean returns a simple JSON
  const userObj = await User.findOne({username}).lean();
  if(!userObj) res.json({status: 'error', message: 'Invalid username/password'});

  // JWT token is used as a validator of the current user session that a genuine user is accessing
  if (await bcrypt.compare(plainTextPassword, userObj.password)){
    const token = jwt.sign({
      id: userObj._id,
      username: userObj.username
    }, configObj.JWT_SECRET);

    res.json({status: 'success', message: 'Login successful', token});
  } else {
    res.json({status: 'error', message: 'Invalid username/password'});
  }
});

app.post('/api/change-password', async (req, res) => {
  const { token, newPassword:plainTextNewPassword } = req.body;
  if(!plainTextNewPassword ||  typeof plainTextNewPassword !== 'string') res.json({status: 'error', message: 'Please provide password as a string'});
  try{
    const user = jwt.verify(token, configObj.JWT_SECRET);
    const _id = user.id;
    const hashedPassword = await bcrypt.hash(plainTextNewPassword, 10);
    await User.updateOne(
      { _id },
      {
        $set: {password: hashedPassword}
      });
    res.json({status: 'success', message: 'password updated successfully'});
  }catch(error){
    res.json({status: 'error', message: ';))'});
  }
});

app.listen(9999, () => {
  console.log('server is up and running');
});