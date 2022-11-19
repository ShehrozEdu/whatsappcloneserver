const url = "localhost:4000/api";
const FileController = {
  fileUpload: async (req, res) => {
    if (!req.file) {
      return res.status(404).json("File not  Found");
    }
    const imgUrl = `${url}/file/${req.file.filename}`;
    return res.status(200).json(imgUrl);
  },
};

module.exports = FileController;
