## Learning of Todays -

1. setup the backend using - npm init -y
2. install express using - npm install express
3. create a js file named server.js
4. write biolerplate code like -
   const express = require("express");
   const app = express();

5. listen to the port using -
   app.listen(3000);

6. start the server using - node server.js
7. If you want to start the server so that it refresh everytime we make some changes in code, use -
   npx nodemon server.js

## Key Learning Takeaways -

# HTTP MEthods - GET, POST, PUT, DELETE

GET - To retrieve data from server
POST - To send data to the server
PUT - To update data on the server
PATCH - To update data on the server partially
DELETE - To delete data from the server

how to use these methods -

1. GET - app.get("/notes", (req, res) => {}

2. POST - app.post("/notes", (req, res) => {})

## res and req in express -

1. req - request - data which is coming from client side
2. res - response - data which is going to client side
