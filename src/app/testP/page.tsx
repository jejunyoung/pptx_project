"use client";

import React, { useState } from "react";
import PptxGenJS from "pptxgenjs";
import handleInputChange from "@/utils/BibleName";

const HomePage: React.FC = () => {
  const [inputText, setInputText] = useState("");
  const [extraText, setExtraText] = useState<string[]>([]);

  const onApplyInput = () => {
    const verses = inputText.split(/\r?\n/);
    const results: string[] = [];

    verses.forEach((verse) => {
      handleInputChange(verse, setInputText, (extra) => {
        if (typeof extra === "string" && extra !== "") {
          results.push(extra);
        }
      });
    });

    setExtraText(results);
  };

  const createPresentation = () => {
    // 새로운 프레젠테이션 생성
    const pptx = new PptxGenJS();

    // 입력된 텍스트를 줄바꿈으로 분리하여 각 구절을 슬라이드로 추가
    const verses = inputText.split(/\r?\n/);

    verses.forEach((verse, index) => {
      const slide = pptx.addSlide();
      slide.background = { fill: "#70AD47" }; // 배경색 설정

      // 사용자 입력 텍스트 추가
      slide.addText(verse, {
        x: 1,
        y: 3,
        fontSize: 20,
        color: "000000",
        fontFace: "HY헤드라인M",
      });

      // extraText 추가
      if (extraText[index]) {
        slide.addText(extraText[index], {
          x: 1,
          y: 4,
          fontSize: 20,
          color: "000000",
          fontFace: "HY헤드라인M",
        });
      }
    });

    // 최종 프레젠테이션 파일 생성
    pptx.writeFile({ fileName: "SamplePresentation.pptx" });
  };

  return (
    <div>
      <h1>pptxgenjs with Next.js</h1>
      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="말씀 구절을 알려주세요(예: 창 1:1)"
        rows={5}
      />
      <br />
      <button onClick={onApplyInput}>구절 생성</button>
      <br />
      {extraText.length > 0 &&
        extraText.map((text, index) => <p key={index}>{text}</p>)}
      <button onClick={createPresentation}>PPT 제작</button>
    </div>
  );
};

export default HomePage;
