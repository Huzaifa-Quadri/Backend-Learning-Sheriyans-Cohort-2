// Helper function from ImageKit SDK to convert Buffer → File object
const { toFile } = require("@imagekit/nodejs");

// Import ImageKit SDK
const ImageKit = require("@imagekit/nodejs").default;

// Create ImageKit client instance
// This authenticates our backend with ImageKit using the private key
// so we can upload files programmatically.
const client = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

// Generic function to upload files to ImageKit.
// This function can be reused for songs, posters, or any other media.
async function fileUpload({ buffer, fileName, folder = "" }) {
  try {
    /*
      Upload Flow:
      1. Convert raw buffer (file in RAM) into a file object using toFile()
      2. Send it to ImageKit storage
      3. ImageKit stores the file and returns a CDN URL
    */

    const { url } = await client.files.upload({
      file: await toFile(Buffer.from(buffer), fileName),
      fileName: fileName,
      folder: folder,
    });

    // Return the CDN URL of uploaded file
    // Example: https://ik.imagekit.io/.../songs/song.mp3
    return url;
  } catch (er) {
    // Log error for debugging
    console.error(er);

    // Re-throw error so the controller can handle it
    throw er;
  }
}

// Export service so controllers can use it for uploading files
module.exports = fileUpload;
