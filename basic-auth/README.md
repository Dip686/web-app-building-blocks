
# Basic Auth Generator:
This package contains code required to create basic sign-up and sign-in mechanism.

> **Note** Learn about building basic auth functioanlity from [here]('https://www.youtube.com/watch?v=b91XgdyX-SM&ab_channel=codedamn')

How to use:
- You must have set up a mongoDB cluster.
- Keep a collection with name users in the cluster. In case of any other name update the collection name provided in `model/users.js` file.
- To establish the connection, add correct credential and valid URL in config file.
- run `node server.js` to start the server.
- In case you see `server is up and running` message, load `localhost:9999` in browser.