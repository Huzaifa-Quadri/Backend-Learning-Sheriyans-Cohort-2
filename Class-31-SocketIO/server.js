import app from "./src/app.js";
import { Server } from "socket.io";
import { createServer } from "node:http";

const server = createServer(app);

// app.get("/", (req, res) => {
//   res.status(200).json({
//     message: "Testing the server for setting up socket",
//   });
// });

// app.listen(3000, () => {
//   console.log("Server Started on Port 3000");
// });

const io = new Server(server);

app.get("/", (req, res) => {
  res.send("<h1>Hello world</h1>");
});

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("message", (msg) => {
    console.log("A message is sent, fired message event");
    console.log(msg);
    io.emit("abc");
  });
});

server.listen(3000, () => {
  console.log("server running at http://localhost:3000");
});
