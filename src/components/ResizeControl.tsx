import React, { useState } from 'react';

export default function ResizeControl() {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [isRatioFixed, setIsRatioFixed] = useState(true);
  const [quality, setQuality] = useState(50);
  const [ratio, setRatio] = useState(0);

  /**
   * 이미지 너비, 높이를 변경하는 핸들러
   */
  const handleSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'width') {
      setWidth(Number(value));
    } else if (name === 'height') {
      setHeight(Number(value));
    }
  };

  const handleClickRatioFixed = () => {
    setIsRatioFixed(!isRatioFixed);
  };

  /**
   * 이미지 퀄리티를 변경하는 핸들러
   */
  const handleQualityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuality(Number(e.target.value));
  };

  console.log(width, height, isRatioFixed, quality);

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
