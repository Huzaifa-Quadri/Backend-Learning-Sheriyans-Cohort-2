const express = require("express");
const postRouter = express.Router();
const postController = require("../controllers/post.controller");
const multer = require("multer");
// const upload = multer()
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

postRouter.post(
  "/create",
  upload.single("image"),
  postController.createPostController,
);

postRouter.get("/getAllposts", postController.getpostsController);

postRouter.get("/details/:postId", postController.getpostDetailController);

module.exports = postRouter;
