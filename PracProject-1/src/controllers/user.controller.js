const followModel = require("../models/follow.model");
const userModel = require("../models/user.model");

async function followUserController(req, res) {
  const followerUsername = req.user.username;
  const followeeUsername = req.params.username;

  if (followeeUsername == followerUsername) {
    return res.status(400).json({
      message: "You can't follow yourself",
    });
  }

  const isfolloweeExists = await userModel.findOne({
    username: followeeUsername,
  });

  if (!isfolloweeExists) {
    return res.status(404).json({
      message: `The User ${followeeUsername} you are trying to follow doesnot Exists !`,
    });
  }

  const isAlreadyfollowed = await followModel.findOne({
    follower: followerUsername,
    followee: followeeUsername,
  });

  if (isAlreadyfollowed) {
    return res.status(200).json({
      message: `${followerUsername}, You are already following ${followeeUsername}`,
    });
  }

  const followRecord = await followModel.create({
    follower: followerUsername,
    following: followeeUsername,
  });

  res.status(201).json({
    message: `${followerUsername}, You are now following ${followeeUsername}`,
    follow: followRecord,
  });
}

async function unfollowuserController(req, res) {
  const followerUsername = req.user.username;
  const followeeUsername = req.params.username;

  if (followeeUsername == followerUsername) {
    return res.status(400).json({
      message: "You can't unfollow yourself",
    });
  }

  const isfolloweeExists = await userModel.findOne({
    username: followeeUsername,
  });

  if (!isfolloweeExists) {
    return res.status(404).json({
      message: `The User ${followeeUsername} you are trying to unfollow doesnot Exists !`,
    });
  }

  const isFollowing = await followModel.findOne({
    follower: followerUsername,
    following: followeeUsername,
  });

  if (!isFollowing) {
    return res.status(200).json({
      message: `${followerUsername}, You are already not following ${followeeUsername}`,
    });
  }

  const deleted = await followModel.findByIdAndDelete(isFollowing._id);

  res.status(200).json({
    message: `You ${followerUsername} unfollowed ${followeeUsername}`,
    deleted,
  });
}

module.exports = {
  followUserController,
  unfollowuserController,
};
