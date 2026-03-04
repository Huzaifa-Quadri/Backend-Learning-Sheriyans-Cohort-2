const express = require("express");
const postRouter = express.Router();
const postController = require("../controllers/post.controller");
const authentication = require("../middlewares/auth.middleware");
const multer = require("multer");
// const upload = multer()
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

/**
 * @route - POST/api/posts/create
 * @description - Create a post
 * @access - private
 */
postRouter.post(
  "/create",
  authentication,
  upload.single("image"),
  postController.createPostController,
);

/**
 * @route - GET/api/posts/getAllposts
 * @description - Get all posts for loggedin user
 * @access - private
 */
postRouter.get(
  "/getAllposts",
  authentication,
  postController.getpostsController,
);

/**
 * @route - GET/api/posts/details/:postId
 * @description - Get details of a post
 * @access - private
 */
postRouter.get(
  "/details/:postId",
  authentication,
  postController.getpostDetailController,
);

/**
 * @route - POST/api/posts/like/:postId
 * @description - Like a post with Id Provided wihout duplication
 * @access - private
 */
postRouter.post(
  "/like/:postId",
  authentication,
  postController.likePostController,
);

/**
 * @route - POST/api/posts/unlike/:postId
 * @description - Unlike a post with Id Provided wihout duplication
 * @access - private
 */
postRouter.post(
  "/unlike/:postId",
  authentication,
  postController.unlikePostController,
);

/**
 * @route - GET/api/posts/feed
 * @description - Give all the posts created in DB
 * @access - private
 */
postRouter.get("/feed", authentication, postController.getFeedController);

module.exports = postRouter;
