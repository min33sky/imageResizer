import React, { useEffect, useRef, useState } from 'react';
import { PhotoIcon } from '@heroicons/react/24/outline';

/**
 * 이미지 업로드 컴포넌트
 */
export default function ImageUpload() {
  const [image, setImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const labelRef = useRef<HTMLLabelElement>(null); //? Drag & Drop의 Style 변경을 위한 Ref

  /**
   * 이미지 업로드 핸들러
   * - 이미지를 업로드하면 이미지를 미리보기로 보여준다.
   */
  const handleOnChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const previewImage = URL.createObjectURL(file);
      setImage(previewImage);
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
      setImage(previewImage);
      labelRef.current?.classList.remove('border-sky-600');
      labelRef.current?.classList.remove('bg-sky-100');
    }
  };

  //? 메모리 누수 방지를 위해 URL.revokeObjectURL()을 사용
  useEffect(() => {
    return () => {
      if (image) URL.revokeObjectURL(image);
    };
  }, [image]);

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
        {image ? (
          <img
            src={image}
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
                <PhotoIcon className="h-8 w-8" />
                <p className="text-lg font-semibold">Upload Image</p>
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
