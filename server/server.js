// server.js

const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const app = express();
const PORT = 3000;

// CORS 설정
app.use(cors());

// Multer 설정
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // 업로드된 파일을 저장할 폴더
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // 파일명 설정
  },
});

const upload = multer({ storage });

// API 엔드포인트
app.post("/upload", upload.single("image"), (req, res) => {
  const productName = req.body.name;
  const ingredients = req.body.ingredients.split(",");

  // 클라이언트로 응답
  res.json({
    message: "파일 업로드 성공",
    product: {
      name: productName,
      ingredients: ingredients,
      imagePath: req.file.path,
    },
  });
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT}에서 실행 중입니다.`);
});
