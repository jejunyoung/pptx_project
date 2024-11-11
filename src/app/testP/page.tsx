"use client";

import React, { useRef, useState } from "react";
import PptxGenJS from "pptxgenjs";
import handleInputChange from "@/utils/BibleName";
import adjustTextAreaHeight from "@/utils/adjustTextAreaHeight";
import PreviewSlide from "@/components/previewSlide";

const HomePage: React.FC = () => {
  const [inputText, setInputText] = useState("");
  const [previewData, setPreviewData] = useState<
    { verse: string; extra: string }[]
  >([]);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const SCALE_FACTOR = 0.5; // 50% 크기로 줄임
  const SLIDE_WIDTH = 960; // 실제 PPT 슬라이드 가로 픽셀
  const SLIDE_HEIGHT = 540; // 실제 PPT 슬라이드 세로 픽셀

  const onApplyInput = async () => {
    const verses = inputText.split(/\r?\n/);
    const results: string[] = [];
    await Promise.all(
      verses.map(async (verse) => {
        await handleInputChange(verse, setInputText, (extra) => {
          if (typeof extra === "string" && extra !== "") {
            results.push(extra);
          }
        });
      })
    );

    setPreviewData(
      verses.map((verse, index) => ({
        verse,
        extra: results[index] || "",
      }))
    );
  };

  const createPresentation = () => {
    const pptx = new PptxGenJS();

    previewData.forEach((data) => {
      const slide = pptx.addSlide();
      slide.background = { fill: "#70AD47" };

      slide.addShape(pptx.ShapeType.roundRect, {
        x: 0.3, //left
        y: 4.4, //top
        w: 9.4, //width
        h: 1, //height
        fill: { color: "#1E3A8A" },
      });

      slide.addShape(pptx.ShapeType.roundRect, {
        x: 0.3, //left
        y: 3.8, //top
        w: 2, //width
        h: 0.5, //height
        fill: { color: "#1E3A8A" },
      });

      slide.addText(data.verse, {
        x: 0.5, //left
        y: 4.03, //top
        w: 5, //width
        fontSize: 18,
        color: "#ffffff",
        fontFace: "HY헤드라인M",
      });

      slide.addText(data.extra, {
        x: 0.5, //left
        y: 4.8, //top
        w: 9, //width
        fontSize: 18,
        color: "#ffffff",
        fontFace: "HY헤드라인M",
      });
    });

    pptx.writeFile({ fileName: "SamplePresentation.pptx" });
  };

  const onChangeTextArae = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setInputText(value);
    if (textAreaRef.current) {
      adjustTextAreaHeight(textAreaRef.current);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">pptxgenjs with Next.js</h1>
      <textarea
        value={inputText}
        ref={textAreaRef}
        onChange={onChangeTextArae}
        placeholder="말씀 구절을 알려주세요(예: 창 1:1)"
        rows={5}
        className="w-full p-2 border border-gray-300 rounded mb-4 overflow-hidden resize-none"
      />
      <button
        onClick={onApplyInput}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mb-4"
      >
        구절 생성
      </button>
      <h2 className="text-xl font-semibold mb-4">미리보기</h2>
      <div className="flex flex-wrap gap-5">
        {previewData.map((data, index) => (
          <PreviewSlide
            key={index}
            data={data}
            scaleFactor={SCALE_FACTOR}
            slideWidth={SLIDE_WIDTH}
            slideHeight={SLIDE_HEIGHT}
          />
        ))}
      </div>
      <button
        onClick={createPresentation}
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        PPT 제작
      </button>
    </div>
  );
};

export default HomePage;
