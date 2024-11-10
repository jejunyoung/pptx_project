import axios from "axios";
import bibleNames from "@/utils/Genesis";
import bookMap from "./bookMap";

const convertToEnglishKey = (input: string): string => {
  const [book, chapterAndVerse] = input.split(" "); // 책 이름과 장/절 분리
  const englishBook = bookMap[book]; // 책 이름을 영어로 변환

  if (!englishBook) {
    throw new Error(`Invalid book name: ${book}`);
  }

  return `${englishBook}/${chapterAndVerse}`;
};

// 동적 캐싱
const dynamicCache: { [key: string]: string } = {};

const fetchBibleVerse = async (key: string): Promise<string> => {
  try {
    const apiKey = convertToEnglishKey(key);
    const encodedUrl = encodeURIComponent(
      `http://ibibles.net/quote.php?kor-${apiKey}`
    );
    const url = `/api/proxy?url=${encodedUrl}`;

    // 디버깅용 URL 출력
    console.log("Encoded Request URL:", url);

    const response = await axios.get(url);
    const html = response.data;

    // HTML 태그 제거 및 텍스트 정리
    const verse = html.replace(/<[^>]*>/g, "").trim();

    // 동적 캐싱에 추가
    dynamicCache[key] = verse;

    // 제거 전 구절 출력
    console.log("제거 전 구절:", verse);

    // "Bible Quote [장:절]" 제거하고 절 번호만 유지, 절 번호 뒤에 . 추가 (정규식 개선)
    const cleanedVerse = verse.replace(
      /^\s*Bible Quote\s*\d+:(\d+)\s*/im,
      "$1. "
    );

    // 제거 후 구절 출력
    console.log("제거 후 구절:", cleanedVerse);

    dynamicCache[key] = cleanedVerse;

    return cleanedVerse;
  } catch (error) {
    console.error("API 요청 실패:", error);
    return "구절을 찾을 수 없습니다.";
  }
};

// 입력 핸들러
const handleInputChange = async (
  value: string,
  setInputText: React.Dispatch<React.SetStateAction<string>>,
  setExtraText: React.Dispatch<React.SetStateAction<string>>
) => {
  const trimmedValue = value.trim();

  if (bibleNames.hasOwnProperty(trimmedValue)) {
    // 정적 데이터에서 구절 가져오기
    const verse = bibleNames[trimmedValue];
    setExtraText(verse);
  } else if (dynamicCache.hasOwnProperty(trimmedValue)) {
    // 동적 캐시에서 구절 가져오기
    const verse = dynamicCache[trimmedValue];
    setExtraText(verse);
  } else {
    // API 요청으로 가져온 구절 처리
    const fetchedVerse = await fetchBibleVerse(trimmedValue);
    setExtraText(fetchedVerse);
  }
};

export default handleInputChange;
