// InputHandler.ts
import bibleNames from "@/utils/Genesis";

const handleInputChange = (
  value: string,
  setInputText: React.Dispatch<React.SetStateAction<string>>,
  setExtraText: React.Dispatch<React.SetStateAction<string>>
) => {
  const trimmedValue = value.trim(); // value의 공백을 제거하고 처리

  if (bibleNames.hasOwnProperty(trimmedValue)) {
    setExtraText(bibleNames[trimmedValue]);
  } else {
    setExtraText("");
  }
};

export default handleInputChange;
