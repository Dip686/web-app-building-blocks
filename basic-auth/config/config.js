// enter your mongodb credentials here
const USERNAME ='***';
const PASSWORD ='************';
const CONNECTION_URL = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.bf4ac.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const JWT_SECRET = 'Hreq31adkjasdjnjDSJJNDSJdsms';

configObj = {
  CONNECTION_URL,
  JWT_SECRET
};

module.exports = configObj;