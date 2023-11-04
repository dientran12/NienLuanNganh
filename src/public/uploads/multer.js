const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'src/public/images/'); // Thư mục lưu trữ tệp tin
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Đổi tên tệp tin
  }
});

const upload = multer({ storage: storage });

module.exports = upload;
