// script.js

document
  .getElementById("product-form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // 폼 제출 방지

    // 입력값 가져오기
    const imageInput = document.getElementById("product-image");
    const productName = document.getElementById("product-name").value;
    const ingredients = document.getElementById("ingredients").value.split(",");

    // 미리보기 설정
    const previewImage = document.getElementById("preview-image");
    const previewName = document.getElementById("preview-name");
    const previewIngredients = document.getElementById("preview-ingredients");

    // 이미지 미리보기
    const reader = new FileReader();
    reader.onload = function (e) {
      previewImage.src = e.target.result; // 업로드한 이미지 표시
    };
    reader.readAsDataURL(imageInput.files[0]);

    // 상품명 및 전성분 표시
    previewName.textContent = productName;
    previewIngredients.innerHTML = ingredients
      .map((ingredient) => `<li>${ingredient.trim()}</li>`)
      .join("");

    // 미리보기 영역 보이기
    document.getElementById("preview").style.display = "block";
  });
