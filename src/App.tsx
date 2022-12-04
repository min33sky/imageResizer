import ImageUpload from './components/ImageUpload';
import ResizeControl from './components/ResizeControl';

export default function App() {
  return (
    <main className="grid h-screen place-items-center bg-gradient-to-tr from-slate-800 to-slate-600">
      <div className="flex w-10/12 max-w-2xl flex-col space-y-6 rounded-lg bg-slate-100 px-5 py-10 shadow-lg">
        <h1 className="text-center text-2xl font-bold">이미지 리사이저</h1>
        {/* 이미지 업로드 컴포넌트 */}
        <ImageUpload />

        {/* 이미지 리사이즈 컴포넌트 */}
        <ResizeControl />

        {/* 다운로드 버튼 */}
        <button className="bg-slate-700 py-3 text-lg tracking-widest text-slate-100 transition hover:bg-slate-800">
          다운로드
        </button>
      </div>
    </main>
  );
}
