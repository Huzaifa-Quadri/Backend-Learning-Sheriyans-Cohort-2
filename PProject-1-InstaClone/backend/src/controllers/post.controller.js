const postModel = require("../models/post.model");
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const likeModel = require("../models/like.model");

const client = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function createPostController(req, res) {
  const { caption } = req.body;

  const userId = req.user.id;

  //* Upload to ImageKit
  const { url } = await client.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName: "Test",
    folder: "cohort-2-InstaClone",
  });

  const post = await postModel.create({
    caption: caption,
    imageUrl: url,
    user: userId,
  });

  res.status(201).json({
    message: "Post Created Successfully",
    post,
  });

  // res.send(file.url);
  // console.log(file.url); OR console.log(url);
}

async function getpostsController(req, res) {
  const userId = req.user.id;

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

  const userId = req.user.id;

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

async function likePostController(req, res) {
  try {
    const username = req.user.username;
    const postId = req.params.postId;

    const postExists = postModel.findById(postId);

    if (!postExists) {
      return res.status(404).json({
        message: "Error : No Such Post Found",
      });
    }

    const like = await likeModel.create({
      post: postId,
      user: username,
    });

    res.status(201).json({
      message: "Post Liked Successfully",
      like,
    });
  } catch (error) {
    console.error("Error creating Like -> ", error);
  }
}

async function getFeedController(req, res) {
  try {
    const posts = await postModel.find().populate("user"); //? Populate is used to get the data of the user who created the post
    // * With this function, it will return the entire user object instead of just the user id
    //? Populate will only work if in schema we have mentioned the refrence of the model we want to populate with "ref" word
    //! It will also return password of the user which is not a good practice so we will handle that in model by making it unreadable
    //? If we want to populate more than one model, we can use populate("user", "name email")

    res.status(200).json({
      message: "Feed posts fetched Successfully",
      posts,
    });
  } catch (error) {
    console.error("Error Getting Posts from DB --->\n", error);
  }
}

module.exports = {
  createPostController,
  getpostsController,
  getpostDetailController,
  likePostController,
  getFeedController,
};
