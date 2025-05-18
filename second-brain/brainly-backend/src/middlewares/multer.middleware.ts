import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    /*
        If same file name already present, then previous file will be replaced by the new file.
        So we should add some kind of unique suffix to each file's name before saving.
        However here when we save file, we upload it to cloudinay and then unlink it from our local server.
    */
    const uniquePrefix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniquePrefix + "_" + file.originalname?.replaceAll(" ", "_")); // originalfilename is the name of the file on the user's computer
  },
});

// export const upload = multer({ storage, fileFilter });
export const upload = multer({ storage });
