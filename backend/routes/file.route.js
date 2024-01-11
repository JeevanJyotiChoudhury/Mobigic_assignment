const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { FileModel } = require("../models/file.model");
const { auth } = require("../middleware/auth.middleware");

const fileRouter = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    cb(null, code + "-" + file.originalname);
  },
});

const upload = multer({ storage });

fileRouter.use(auth);

fileRouter.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const { originalname, filename } = req.file;
    const { user } = req.body;

    const newFile = await FileModel.create({
      user,
      fileName: originalname,
      code: filename.split("-")[0],
    });

    res
      .status(201)
      .json({ message: "File uploaded successfully", file: newFile });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
});

fileRouter.get("/list", async (req, res) => {
  try {
    const files = await FileModel.find({ user: req.user });
    res.json({ files });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});

fileRouter.delete("/delete/:fileId", async (req, res) => {
  try {
    const { fileId } = req.params;
    const fileToDelete = await FileModel.findById(fileId);
    if (!fileToDelete) {
      return res.status(404).json({ error: "File not found" });
    }
    const filePath = path.join("./uploads", fileToDelete.fileName);
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .json({ error: "Failed to delete file from the file system" });
      }

      FileModel.findByIdAndDelete(fileId, (err) => {
        if (err) {
          console.error(err);
          return res
            .status(500)
            .json({ error: "Failed to delete file from the database" });
        }

        res.json({ message: "File deleted successfully" });
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});

fileRouter.get("/download/:fileId/:code", async (req, res) => {
  try {
    const { fileId, code } = req.params;
    const file = await FileModel.findById(fileId);
    if (!file || file.code !== code) {
      return res.status(403).json({ error: "Invalid access code" });
    }
    const filePath = path.join("./uploads", file.fileName);
    res.download(filePath, file.fileName, (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to download file" });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});

module.exports = {
  fileRouter,
};
