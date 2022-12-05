import { useCallback, useState } from 'react';
import ImageUpload from './components/ImageUpload';
import ResizeController from './components/ResizeController';

export default function App() {
  const [imageWidth, setImageWidth] = useState(0);
  const [imageHeight, setImageHeight] = useState(0);
  const [imageUrl, setImageUrl] = useState('');
  const [imageRatio, setImageRatio] = useState(0);
  const [imageQuality, setImageQuality] = useState(0);

  /**
   * 업로드한 이미지의 원본 너비, 높이를 가져오는 함수
   */
  const getImageOriginalSize = useCallback(
    (width: number, height: number, imageUrl: string) => {
      setImageWidth(width);
      setImageHeight(height);
      setImageUrl(imageUrl);
      setImageRatio(width / height);
    },
    [],
  );

  /**
   * 리사이즈된 이미지의 너비, 높이, 퀄리티를 가져오는 함수
   */
  const handleResize = useCallback(
    (width: number, height: number, quality: number) => {
      setImageWidth(width);
      setImageHeight(height);
      setImageQuality(quality);
    },
    [],
  );

  const handleDownload = useCallback(() => {
    const canvas = document.createElement('canvas');
    const aTag = document.createElement('a');
    const ctx = canvas.getContext('2d');

    const imgQuality = imageQuality / 100;

    canvas.width = imageWidth;
    canvas.height = imageHeight;

    //? 이미지를 캔버스에 그리기
    const image = new Image();
    image.src = imageUrl;
    image.onload = () => {
      ctx?.drawImage(image, 0, 0, imageWidth, imageHeight);
      aTag.href = canvas.toDataURL('image/jpeg', imgQuality);
      aTag.download = `Resize_${new Date().getTime().toString()}`;
      aTag.click();
    };
  }, [imageUrl]);

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
            <button
              onClick={handleDownload}
              className="bg-slate-700 py-3 text-lg tracking-widest text-slate-100 transition hover:bg-slate-800"
            >
              다운로드
            </button>
          </>
        )}
      </div>
    </main>
  );
}
