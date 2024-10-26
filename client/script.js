document.getElementById("product-type").addEventListener("change", function () {
  const selectedType = this.value;
  const cosmeticsForm = document.getElementById("cosmetics-form");
  const fashionForm = document.getElementById("fashion-form");

  // 모든 폼 숨기기
  cosmeticsForm.style.display = "none";
  fashionForm.style.display = "none";

  // 선택된 상품 종류에 따라 폼 보여주기
  if (selectedType === "cosmetics") {
    cosmeticsForm.style.display = "block"; // 화장품 폼 보여주기
  } else if (selectedType === "fashion") {
    fashionForm.style.display = "block"; // 패션 폼 보여주기
  }
});

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

//png
document.getElementById("download").addEventListener("click", () => {
  const outputElement = document.getElementById("output");

  if (outputElement) {
    html2canvas(outputElement)
      .then((canvas) => {
        const link = document.createElement("a");
        link.download = "preview.png"; // 파일 이름 설정
        link.href = canvas.toDataURL("image/png"); // PNG 형식으로 변환
        link.click(); // 다운로드 시작
      })
      .catch((error) => {
        console.error("Error generating PNG: ", error);
      });
  } else {
    console.error("Output element not found!");
  }
});

//pdf
document.getElementById("download-pdf").addEventListener("click", () => {
  const outputElement = document.getElementById("output");

  if (outputElement) {
    html2canvas(outputElement)
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF();
        const imgWidth = 190; // PDF의 이미지 너비
        const pageHeight = pdf.internal.pageSize.height;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;

        let position = 0;

        // 첫 페이지에 이미지 추가
        pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        // 페이지가 남아있는 경우 추가
        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        pdf.save("preview.pdf"); // PDF 저장
      })
      .catch((error) => {
        console.error("Error generating PDF: ", error);
      });
  } else {
    console.error("Output element not found!");
  }
});
