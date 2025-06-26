import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

// Check file type
function checkFileType(file, cb) {
  // Allowed extensions
  const allowedExts = /jpeg|jpg|png|gif|mp4|webm|mp3|wav|m4a|ogg|aac|flac|pdf|doc|docx|xls|xlsx|ppt|pptx|txt|zip|rar/;
  // Allowed mimetypes
  const allowedMimes = /^(image\/jpeg|image\/jpg|image\/png|image\/gif|video\/mp4|video\/webm|audio\/mpeg|audio\/wav|audio\/x-wav|audio\/m4a|audio\/ogg|audio\/aac|audio\/flac|application\/pdf|application\/msword|application\/vnd.openxmlformats-officedocument.wordprocessingml.document|application\/vnd.ms-excel|application\/vnd.openxmlformats-officedocument.spreadsheetml.sheet|application\/vnd.ms-powerpoint|application\/vnd.openxmlformats-officedocument.presentationml.presentation|text\/plain|application\/zip|application\/x-rar-compressed)$/i;

  // Check extension
  const extname = allowedExts.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = allowedMimes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Error: Invalid file type!'));
  }
}

const upload = multer({
  storage,
  limits: { fileSize: 15 * 1024 * 1024 * 1024 }, // 15GB max file size
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

export { upload };