import React, { useEffect, useState } from 'react';

interface Props {
  originalWidth: number;
  originalHeight: number;
  originalRatio: number;
  onChangeSize: (width: number, height: number, quality: number) => void;
}

export default function ResizeController({
  originalWidth,
  originalHeight,
  originalRatio,
  onChangeSize,
}: Props) {
  const [width, setWidth] = useState(originalWidth);
  const [height, setHeight] = useState(originalHeight);
  const [isRatioFixed, setIsRatioFixed] = useState(true);
  const [quality, setQuality] = useState(75);
  const [ratio, setRatio] = useState(originalRatio);

  /**
   * 이미지 너비, 높이를 변경하는 핸들러
   */
  const handleSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'width') {
      if (isRatioFixed) {
        setWidth(Number(value) || 1);
        setHeight(Math.floor(Number(value) / ratio));
      } else {
        setWidth(Number(value) || 1);
      }
    } else if (name === 'height') {
      if (isRatioFixed) {
        setHeight(Number(value) || 1);
        setWidth(Math.floor(Number(value) * ratio));
      } else {
        setHeight(Number(value) || 1);
      }
    }
  };

  /**
   * 이미지 비율을 고정 여부를 설정하는 핸들러
   */
  const handleClickRatioFixed = () => {
    setIsRatioFixed(!isRatioFixed);
  };

  /**
   * 이미지 퀄리티를 변경하는 핸들러
   */
  const handleQualityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuality(Number(e.target.value));
  };

  /**
   * 이미지가 변경되면 이미지의 사이즈를 재조정
   */
  useEffect(() => {
    setWidth(originalWidth);
    setHeight(originalHeight);
    setRatio(originalRatio);
  }, [originalWidth, originalHeight, originalRatio]);

  /**
   * 이미지 사이즈가 변경되면 부모 컴포넌트에게 변경된 이미지 사이즈를 전달
   */
  useEffect(() => {
    onChangeSize(width, height, quality);
  }, [width, height, quality]);

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 py-4 text-xl md:grid-cols-8">
        <div className="flex items-center space-x-3  md:col-span-3">
          <label htmlFor="width" className="flex-shrink-0">
            너비
          </label>
          <input
            type="number"
            id="width"
            name="width"
            value={width}
            min="1"
            onChange={handleSize}
            className="w-full rounded-md border border-slate-300 p-2 outline-none"
          />
        </div>

        <div className="flex items-center space-x-3 md:col-span-3">
          <label htmlFor="height" className="flex-shrink-0">
            높이
          </label>
          <input
            type="number"
            id="height"
            name="height"
            value={height}
            min="1"
            onChange={handleSize}
            className="w-full rounded-md border border-slate-300 p-2 outline-none"
          />
        </div>

        <div className="flex items-center space-x-3 py-2 md:col-span-2">
          <label htmlFor="aspect" className="flex-shrink-0 cursor-pointer">
            비율 유지
          </label>
          <input
            type="checkbox"
            id="aspect"
            className="h-6 w-6 cursor-pointer"
            checked={isRatioFixed}
            onChange={handleClickRatioFixed}
          />
        </div>

        <div className="flex items-center space-x-3 py-2 md:col-span-full">
          <label htmlFor="quality" className="flex-shrink-0 cursor-pointer">
            이미지 퀄리티
          </label>
          <input
            title={`${quality}%`}
            type="range"
            id="quality"
            className="w-full cursor-move"
            onChange={handleQualityChange}
            value={quality}
          />
          <div className="">{quality}%</div>
        </div>
      </div>
    </div>
  );
}
