// components/PreviewSlide.tsx
import React from "react";
import { scaled, scaledT } from "@/utils/scaled";

interface PreviewSlideProps {
  data: { verse: string; extra: string };
  scaleFactor: number;
  slideWidth: number; // PowerPoint 슬라이드 너비
  slideHeight: number; // PowerPoint 슬라이드 높이
}

const PreviewSlide: React.FC<PreviewSlideProps> = ({
  data,
  scaleFactor,
  slideWidth,
  slideHeight,
}) => {
  const textAdjustment = 0.1 * 96; // 보정값 (px)

  return (
    <div
      className="relative border border-gray-300 rounded text-black"
      style={{
        width: `${scaled(slideWidth, scaleFactor)}px`,
        height: `${scaled(slideHeight, scaleFactor)}px`,
        padding: `${scaled(20, scaleFactor)}px`,
        backgroundColor: "#70AD47",
      }}
    >
      {/* 제목 도형 */}
      <div
        className="absolute bg-blue-900"
        style={{
          top: `${scaled(4.4 * 96, scaleFactor)}px`,
          left: `${scaled(0.3 * 96, scaleFactor)}px`,
          width: `${scaled(9.4 * 96, scaleFactor)}px`,
          height: `${scaled(1 * 96, scaleFactor)}px`,
          borderRadius: `${scaled(0.2 * 96, scaleFactor)}px`,
        }}
      ></div>

      {/* 내용 도형 */}
      <div
        className="absolute bg-blue-900"
        style={{
          top: `${scaled(3.8 * 96, scaleFactor)}px`,
          left: `${scaled(0.3 * 96, scaleFactor)}px`,
          width: `${scaled(2 * 96, scaleFactor)}px`,
          height: `${scaled(0.5 * 96, scaleFactor)}px`,
          borderRadius: `${scaled(0.2 * 96, scaleFactor)}px`,
        }}
      ></div>

      {/* 구절 텍스트 */}
      <p
        className="absolute text-sm font-medium text-white"
        style={{
          top: `${scaled(4.03 * 96, scaleFactor) - textAdjustment}px`, // 보정값 적용
          left: `${scaled(0.5 * 96, scaleFactor)}px`,
          width: `${scaled(5 * 96, scaleFactor)}px`,
          fontSize: `${scaledT(20, scaleFactor, "px")}px`, // px 단위로 변환
        }}
      >
        {data.verse}
      </p>

      {/* 내용 텍스트 */}
      <p
        className="absolute text-sm font-medium text-white"
        style={{
          top: `${scaled(4.8 * 93, scaleFactor) - textAdjustment}px`, // 보정값 적용
          left: `${scaled(0.5 * 100, scaleFactor)}px`,
          width: `${scaled(9 * 96, scaleFactor)}px`,
          fontSize: `${scaledT(20, scaleFactor, "px")}px`, // px 단위로 변환
        }}
      >
        {data.extra}
      </p>
    </div>
  );
};

export default PreviewSlide;
