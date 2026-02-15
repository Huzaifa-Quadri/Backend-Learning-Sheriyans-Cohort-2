const postModel = require("../models/post.model");
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

const client = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function createPostController(req, res) {
  const { caption } = req.body;
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Token not Provided, Un-authorized Access",
    });
  }
  let decoded = null;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (e) {
    return res.status(401).json({
      message: "Invalid Token!! User Not Authorized",
    });
  }

  //* Upload to ImageKit
  const { url } = await client.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName: "Test",
    folder: "cohort-2-InstaClone",
  });

  const post = await postModel.create({
    caption: caption,
    imageUrl: url,
    user: decoded.id,
  });

  res.status(201).json({
    message: "Post Created Successfully",
    post,
  });

  // res.send(file.url);
  // console.log(file.url); OR console.log(url);
}

async function getpostsController(req, res) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Token not Provided, Un-authorized Access",
    });
  }
  let decoded = null;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (e) {
    return res.status(401).json({
      message: "Invalid Token!! User Not Authorized",
    });
  }
  const userId = decoded.id;

  const posts = await postModel.find({
    user: userId,
  });
  console.log(posts);

  if (posts.length === 0) {
    return res.status(404).json({
      message: "No Posts found for this user",
      posts,
    });
  }

  res.status(200).json({
    message: "Posts fetched Successfully",
    posts,
  });
}

async function getpostDetailController(req, res) {
  const postId = req.params.postId;
  const token = req.cookies.token;

  let decoded = null;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (e) {
    return res.status(401).json({
      message: "Invalid Token!! User Not Authorized",
    });
  }
  const userId = decoded.id;

  // const post = await postModel.findOne({
  //   _id: postId,
  // });
  let post = null;
  try {
    post = await postModel.findById(postId);
  } catch (e) {
    console.log("Error on getting post -> ", e);
  }

  if (!post) {
    return res.status(404).json({
      message: "Error : No Such Post Found",
    });
  }

  if (post.user.toString() !== userId) {
    return res.status(401).json({
      message: "You are not Authorized to view this",
    });
  }

  res.status(200).json({
    message: "Here is Your Post ->",
    post,
  });
}

module.exports = {
  createPostController,
  getpostsController,
  getpostDetailController,
};
