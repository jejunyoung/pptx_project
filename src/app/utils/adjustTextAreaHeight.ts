const adjustTextAreaHeight = (textArea: HTMLTextAreaElement) => {
  if (textArea) {
    textArea.style.height = "auto"; // 높이 초기화
    textArea.style.height = `${textArea.scrollHeight}px`; // 스크롤 높이만큼 조정
  }
};

export default adjustTextAreaHeight;
