## Folder and file structure

1. src/app.js - Create and config the server
2. server.js - Start the server

# We can define/make our own command by editing package.json file -

"dev" : "nodemon server.js" // Making out own script - dev script to run server with nodemon

we can start server using - npm run dev

# Dynamically updating data send via json from patch api in notes

app.fetch("/notes/:index", (req, res)=>{
notes[req.params.index].description = req.body.description
})
