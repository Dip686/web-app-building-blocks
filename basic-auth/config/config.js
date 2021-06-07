// enter your mongodb credentials here
const USERNAME ='***';
const PASSWORD ='************';
const CONNECTION_URL = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.bf4ac.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

configObj = {
  CONNECTION_URL
};

module.exports = configObj;