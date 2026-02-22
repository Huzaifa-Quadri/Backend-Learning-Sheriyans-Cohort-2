const express = require("express");
const authentication = require("../middlewares/auth.middleware");
const userController = require("../controllers/user.controller");
const userRouter = express.Router();

/**
 * @route - POST/api/users/follow/username
 * @description - Follow a user; user sending this api is follower and username to whom is sending is followee
 * @access - private
 */
userRouter.post(
  "/follow/:username",
  authentication,
  userController.followUserController,
);

/**
 * @route - POST/api/users/unfollow/:username
 * @description - UnFollow a user; user sending this api is follower and username to whom is sending is followee
 * @access - private
 */
userRouter.post(
  "/unfollow/:username",
  authentication,
  userController.unfollowuserController,
);

module.exports = userRouter;
