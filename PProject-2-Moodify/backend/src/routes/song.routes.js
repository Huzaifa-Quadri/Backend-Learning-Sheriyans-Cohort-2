const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const songController = require("../controllers/song.controller");
const upload = require("../middleware/upload.middleware");

const songRouter = express.Router();

/**
 * @route - POST/api/songs/upload
 * @description - For uploading a song
 * @access - private
 */
songRouter.post(
  "/upload",
  authMiddleware,
  upload.single("song"),
  songController.uploadSongController,
);

/**
 * @route - GET/api/songs/getSong
 * @description - For fetching all the songs by mood
 * @access - private
 */
songRouter.get("/getSong", authMiddleware, songController.getSongController);

module.exports = songRouter;
