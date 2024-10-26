// server/server.js

const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();
const PORT = 3000;

// multer 설정
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // 업로드할 경로
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // 파일 이름 설정
  },
});

const upload = multer({ storage });

// 정적 파일 제공 (클라이언트 파일)
app.use(express.static(path.join(__dirname, "../client")));

// 파일 업로드 API
app.post("/upload", upload.single("image"), (req, res) => {
  console.log(req.file); // 업로드된 파일 정보 확인
  console.log(req.body); // 다른 데이터 확인

  res.json({
    message: "파일이 업로드되었습니다!",
    file: req.file,
  });
});

// 서버 실행
app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});
