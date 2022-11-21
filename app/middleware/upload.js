const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
// import multer from './Middleware';
// import {GridFsStorage}from

const storage = new GridFsStorage({
  url: process.env.MONGODB_URI,

  options: {
    useNewUrlParser: true,
  },

  file: (req, file) => {
    const match = ["image/png", "image/jpg"];

    if (match.indexOf(file.mimeType) === -1) {
      return `${Math.random(4)}-file-${file.originalname}`;
    }
    return {
      bucketName: "photos",
      filename: `${Math.random(4)}-file-${file.originalname}`,
    };
  },
});

module.exports = multer({ storage });
