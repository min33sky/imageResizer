import { useCallback, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import ImageUploadZone from './components/ImageUploadZone';
import ResizeController from './components/ResizeController';
import { ArrowDownTrayIcon, PhotoIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-hot-toast';

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

  /**
   * 이미지 다운로드 핸들러
   */
  const handleImageDownload = useCallback(() => {
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
      toast.success('이미지 다운로드가 완료되었습니다.');
    };
  }, [imageUrl, imageWidth, imageHeight, imageQuality]);

  return (
    <>
      <main className="flex min-h-screen justify-center overflow-hidden bg-gradient-to-tr from-zinc-700 to-zinc-500">
        <div
          className={`mt-28 flex h-[380px] w-10/12 max-w-xl flex-col space-y-2 overflow-hidden rounded-lg bg-zinc-100 px-4 pt-6 shadow-lg transition-all  duration-500 sm:mt-24 sm:h-[380px]  ${
            imageUrl && 'h-[710px] sm:h-[600px]'
          }`}
        >
          <h1 className="flex items-center justify-center gap-2 text-center text-xl font-semibold">
            <PhotoIcon className="inline-block h-6 w-6" />
            <span>이미지 리사이즈</span>
          </h1>

          {/* 이미지 업로드 컴포넌트 */}
          <ImageUploadZone getImageSize={getImageOriginalSize} />

          <div
            className={`flex flex-col opacity-0 transition-all duration-1000 ${
              imageUrl && 'opacity-100'
            }`}
          >
            <ResizeController
              originalWidth={imageWidth}
              originalHeight={imageHeight}
              originalRatio={imageRatio}
              onChangeSize={handleResize}
            />

            <button
              type="button"
              aria-label="Button to download image"
              title="이미지 다운로드"
              onClick={handleImageDownload}
              className="flex items-center justify-center bg-zinc-700 py-3
            text-lg tracking-widest text-zinc-100 transition hover:bg-zinc-800 active:ring-4 active:ring-blue-500"
            >
              <ArrowDownTrayIcon className="mr-2 inline-block h-5 w-5" />
              다운로드
            </button>
          </div>
        </div>
      </main>
      <Toaster />
    </>
  );
}
