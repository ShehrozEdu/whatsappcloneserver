const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const storage = new GridFsStorage({
  url: process.env.MONGODB_URI,
  options: {
    useNewUrlParser: true,
    file: (req, file) => {
      const match = ["image/png", "image/jpg"];

      if (match.indexOf(file.mimeType) === -1) {
        return `${Date.now}-file-${file.originalname}`;
      }
      return {
        bucketName: "photos",
        filename: `${Date.now}-file-${file.originalname}`,
      };
    },
  },
});

const uploadImg = multer({
  storage: storage,
});

exports.uploadImg = uploadImg;
