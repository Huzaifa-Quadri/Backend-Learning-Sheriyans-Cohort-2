const nodeid3 = require("node-id3");
const fileUpload = require("../services/storage.service");
const songModel = require("../models/song.model");
async function uploadSongController(req, res) {
  console.log(req.file);

  try {
    const { mood } = req.body;
    const songBuffer = req.file.buffer;

    const tags = nodeid3.read(songBuffer); //* Buffer will have all the info given by multer

    const songTitle = tags.title
      // Remove square bracket text
      .replace(/\[.*?\]/g, "")

      // Remove parenthesis text
      .replace(/\(.*?\)/g, "")

      // Replace HTML encoded quotes
      .replace(/&quot;/g, '"')

      // Remove extra spaces
      .replace(/\s+/g, " ")
      .trim();

    // console.log("Tags : \n\n", tags);
    // const songFile = await fileUpload({
    //   buffer: songBuffer,
    //   fileName: tags.title + ".mp3",
    //   folder: "/cohort-2-moodify/songs",
    // });

    // const posterFile = await fileUpload({
    //   buffer: tags.image.imageBuffer,
    //   fileName: tags.title + ".jpeg",
    //   folder: "/cohort-2-moodify/posters",
    // });

    //? Alternative : After successfully song creation from above uplods, we have to mrege above functions to upload both at same time with Promise.all() method for faster action
    //bOTH Aactions will start consequently and we will wait till both are completed
    const [songFile, posterFile] = await Promise.all([
      fileUpload({
        buffer: songBuffer,
        fileName: songTitle + ".mp3",
        folder: "/cohort-2-moodify/songs",
      }),
      fileUpload({
        buffer: tags.image.imageBuffer,
        fileName: songTitle + ".jpeg",
        folder: "/cohort-2-moodify/posters",
      }),
    ]);

    const song = await songModel.create({
      url: songFile,
      posterUrl: posterFile,
      title: songTitle,
      mood: mood,
    });

    res.status(200).json({
      message: "Song Created Successfully",
      song,
    });
  } catch (er) {
    console.error(er);
    res.status(400).json({
      message: "Error in Uploading Songs",
    });
  }
}

module.exports = {
  uploadSongController,
};
