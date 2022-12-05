import { useCallback, useState } from 'react';
import ImageUpload from './components/ImageUpload';
import ResizeController from './components/ResizeController';

export default function App() {
  const [imageWidth, setImageWidth] = useState(0);
  const [imageHeight, setImageHeight] = useState(0);
  const [imageRatio, setImageRatio] = useState(0);

  /**
   * 이미지의 원본 너비, 높이를 가져오는 함수
   */
  const getImageOriginalSize = useCallback((width: number, height: number) => {
    setImageWidth(width);
    setImageHeight(height);
    setImageRatio(width / height);
    console.log('원본 사이즈: ', width, height, width / height);
  }, []);

  const handleResize = (width: number, height: number) => {
    console.log('리사이즈 사이즈: ', width, height, width / height);
  };

  return (
    <main className="grid h-screen place-items-center bg-gradient-to-tr from-slate-800 to-slate-600">
      <div className="flex w-10/12 max-w-2xl flex-col space-y-6 rounded-lg bg-slate-100 px-5 py-10 shadow-lg">
        <h1 className="text-center text-2xl font-bold">이미지 리사이저</h1>
        {/* 이미지 업로드 컴포넌트 */}
        <ImageUpload getImageSize={getImageOriginalSize} />

        {imageWidth > 0 && (
          <>
            {/* 이미지 리사이즈 컴포넌트 */}
            <ResizeController
              originalWidth={imageWidth}
              originalHeight={imageHeight}
              originalRatio={imageRatio}
              onChangeSize={handleResize}
            />

            {/* 다운로드 버튼 */}
            <button className="bg-slate-700 py-3 text-lg tracking-widest text-slate-100 transition hover:bg-slate-800">
              다운로드
            </button>
          </>
        )}
      </div>
    </main>
  );
}
