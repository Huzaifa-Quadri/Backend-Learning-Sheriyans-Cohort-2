# Databases

1. As we restart the server, all our data is lost as it is stored on an instance of RAM
2. SO we need a database to store out Data.
3. MongoDb is a popular NoSQL document database that stores data in flexible, JSON-like documents, making it ideal for modern web/mobile apps needing scalability and fast development
4. For Setting up Mongo DB -
   a. We have to sign up and make a project on MongoDB Cloud
   b. Second, we have to create a cluster (A cloud Machine with limited storage and CPU); we will choose free cluster here by amazon.
   c. We have to add user
   d. Add security (for now all all ip)
   e. Copy connection string with password for later
   d. Download MongoDB Compass on desktop for connecting to MongoDB server
   e. TO COnnect with MongoDB compass, wnter the connection string and click connect!

5. Install Mongoose package - npm i mongoose
6. Make a function to connect to MongoDB with Connection String
