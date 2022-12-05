import React, { useEffect, useRef, useState } from 'react';
import { PhotoIcon } from '@heroicons/react/24/outline';

interface Props {
  getImageSize: (width: number, height: number, imageUrl: string) => void;
}

/**
 * 이미지 업로드 컴포넌트
 */
export default function ImageUpload({ getImageSize }: Props) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const labelRef = useRef<HTMLLabelElement>(null); //? Drag & Drop의 Style 변경을 위한 Ref
  const imageRef = useRef<HTMLImageElement>(null); //? 이미지의 너비, 높이를 가져오기 위한 Ref

  /**
   * 이미지 업로드 핸들러
   * - 이미지를 업로드하면 이미지를 미리보기로 보여준다.
   */
  const handleOnChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const previewImage = URL.createObjectURL(file);
      setImageUrl(previewImage);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(true);
    labelRef.current?.classList.add('border-sky-600');
    labelRef.current?.classList.add('bg-sky-100');
  };

  const handleDragEnd = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);
    labelRef.current?.classList.remove('border-sky-600');
    labelRef.current?.classList.remove('bg-sky-100');
  };

  const handleImageDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    if (
      e.dataTransfer.files &&
      e.dataTransfer.files.length > 0 &&
      labelRef.current
    ) {
      const file = e.dataTransfer.files[0];
      const previewImage = URL.createObjectURL(file);
      setImageUrl(previewImage);

      labelRef.current?.classList.remove('border-sky-600');
      labelRef.current?.classList.remove('bg-sky-100');
    }
  };

  //? 메모리 누수 방지를 위해 URL.revokeObjectURL()을 사용
  useEffect(() => {
    return () => {
      if (imageUrl) URL.revokeObjectURL(imageUrl);
    };
  }, [imageUrl]);

  //? 이미지 원본 크기를 가져온다. (이미지 객체를 사용해서 가져와도 될 것 같다.)
  useEffect(() => {
    if (imageRef.current) {
      imageRef.current.onload = () => {
        getImageSize(
          imageRef.current?.naturalWidth || 0,
          imageRef.current?.naturalHeight || 0,
          imageUrl || '',
        );
      };
    }
  }, [imageUrl]);

  return (
    <div>
      <label
        ref={labelRef}
        title="클릭하여 이미지를 업로드하세요."
        className="flex aspect-video w-full cursor-pointer flex-col
        items-center justify-center  border-2 border-dashed border-slate-600 bg-slate-100
      transition hover:border-sky-600 hover:text-sky-600"
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        onDragLeave={handleDragEnd}
        onDrop={handleImageDrop}
      >
        {imageUrl ? (
          <img
            ref={imageRef}
            src={imageUrl}
            className="h-full w-full object-contain"
            alt="upload image"
          />
        ) : (
          <>
            {isDragging ? (
              <p className="animate-bounce text-2xl font-bold text-sky-600">
                Drop!
              </p>
            ) : (
              <>
                <PhotoIcon className="h-10 w-10" />
                <p className="mt-2 text-lg font-semibold">
                  클릭하거나 이미지를 드래그하여 업로드하세요.
                </p>
              </>
            )}
          </>
        )}

        {/* 파일 인풋은 화면에서 보여주지 않는다. */}
        <input
          type="file"
          onChange={handleOnChangeImage}
          hidden
          accept="image/*"
        />
      </label>
    </div>
  );
}
