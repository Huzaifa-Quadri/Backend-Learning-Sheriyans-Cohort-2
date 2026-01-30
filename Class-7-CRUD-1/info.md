# Key learning from databases and other -

## Folder Strcuture should be maintained & DB Things

1. Function that connect server to database should be written in database.js in config folder inside src folder and exported to server.js
2. For storing data in database, we must define a schema inside <db-object>.model.js file inside models folder in src.
3. After defining schema, a model should be created in same file that would enable opration in database and export this model to app for operations
4. Require the model in app with exact name use with api.
5. Define and use .env in root folder for hinding sensitive info
6. to use env, install dotenv package - npm i dotenv

## Sending and Getting Data from Database

1. use create function to send data to database in post method
2. Make a .env file for private connection variables and important data
3. use find method to fetch all data objects from db as array of stored objects
4. To use env variable write this above all in server.js file - require("dotenv").config();
5. How to use env variable in any file -
   const varibale_name = process.env.<ENV_VARIABLE_NAME(exact without typo)>
