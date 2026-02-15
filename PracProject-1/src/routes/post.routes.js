const express = require("express");
const postRouter = express.Router();
const postController = require("../controllers/post.controller");
const authentication = require("../middlewares/auth.middleware");
const multer = require("multer");
// const upload = multer()
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

postRouter.post(
  "/create",
  authentication,
  upload.single("image"),
  postController.createPostController,
);

postRouter.get(
  "/getAllposts",
  authentication,
  postController.getpostsController,
);

postRouter.get(
  "/details/:postId",
  authentication,
  postController.getpostDetailController,
);

module.exports = postRouter;
