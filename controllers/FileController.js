const mongoose = require("mongoose");
const grid = require("gridfs-stream");

const url = "http://localhost:4000/api";

let gfs;
let gridFsBucket;
const conn = mongoose.connection;
conn.once("open", () => {
  gridFsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "fs",
  });
  gfs = grid(conn.db, mongoose.mongo);
  gfs.collection("fs");
});

const FileController = {
  fileUpload: async (req, res) => {
    try {
      if (!req.file) {
        return res.status(404).json("File not Found");
      }
      const imgUrl = `${url}/file/${req.file.filename}`;
      return await res.status(200).json(imgUrl);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  },

  getImage: async (req, res) => {
    try {
      const file = await gfs.files.findOne({ filename: req.params.filename });
      const readStream = gridFsBucket.openDownloadStream(file._id);
      readStream.pipe(res);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  },
  //change
};

module.exports = FileController;
