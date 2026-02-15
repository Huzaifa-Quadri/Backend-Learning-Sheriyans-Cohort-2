const express = require("express");
const postRouter = express.Router();
const postController = require("../controllers/post.controller");

postRouter.post("/create", postController.createPostController);

module.exports = postRouter;
