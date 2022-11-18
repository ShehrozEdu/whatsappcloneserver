const url = "localhost:4000/api";
const FileController = {
  fileUpload: async (req, res) => {
    try {
      if (!req.file) {
        return res.status(404).json("File not  Found");
      }
      const imgUrl = `${url}/file/${req.file.filename}`;
      return await res.status(200).json(imgUrl);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  },
};

module.exports = FileController;
