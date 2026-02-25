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
    following: followeeUsername,
    status: "accepted",
  });

  if (isAlreadyfollowed) {
    return res.status(200).json({
      message: `${followerUsername}, You are already following ${followeeUsername}`,
    });
  }

  const isFollowRequestPending = await followModel.findOne({
    follower: followerUsername,
    following: followeeUsername,
    status: "pending",
  });

  if (isFollowRequestPending) {
    return res.status(200).json({
      message: `${followerUsername}, Your follow request is already sent to ${followeeUsername}`,
    });
  }

  const followRecord = await followModel.create({
    follower: followerUsername,
    following: followeeUsername,
  });

  res.status(201).json({
    message: `${followerUsername}, Your follow request is sent to ${followeeUsername}`,
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
    status: "accepted",
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

async function acceptFollowRequestController(req, res) {
  try {
    const followerReqId = req.params.followReqId;
    const followReq = await followModel.findById(followerReqId);

    if (!followReq) {
      return res.status(404).json({
        message: `The Follow Request ${followerReqId} doesnot Exists !`,
      });
    }

    if (followReq.following !== req.user.username) {
      return res.status(401).json({
        message: "You are not authorized to do anything with this request",
      });
    }

    if (followReq.status === "accepted") {
      return res.status(200).json({
        message: `You ${followReq.following} have already accepted the follow request`,
      });
    }

    const accepted = await followModel.findByIdAndUpdate(followReq, {
      status: "accepted",
    });

    res.status(200).json({
      message: `${followReq.follower} is now following you`,
      accepted,
    });
  } catch (error) {
    console.error("Error in accepting follow request", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

async function rejectFollowRequestController(req, res) {
  try {
    const followerReqId = req.params.followReqId;
    const followReq = await followModel.findById(followerReqId);

    if (!followReq) {
      return res.status(404).json({
        message: `The Follow Request ${followerReqId} doesnot Exists !`,
      });
    }

    if (followReq.following !== req.user.username) {
      return res.status(401).json({
        message: "You are not authorized to do anything with this request",
      });
    }

    const isfollowaccepted = followReq.status === "accepted";
    if (isfollowaccepted) {
      return res.status(200).json({
        message: `You ${followReq.following} have already accepted the follow request`,
      });
    }

    const isfollowrejected = followReq.status === "rejected";
    if (isfollowrejected) {
      return res.status(200).json({
        message: `You ${followReq.following} have already rejected the follow request`,
      });
    }

    const rejected = await followModel.findByIdAndUpdate(followReq, {
      status: "rejected",
    });

    res.status(200).json({
      message: `${followReq.follower} is now rejected by you`,
      rejected,
    });
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  followUserController,
  unfollowuserController,
  acceptFollowRequestController,
  rejectFollowRequestController,
};
