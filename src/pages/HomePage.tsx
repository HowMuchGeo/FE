import Gnb from '../components/Gnb';

//메인 홈 페이지 (로그인 후 시작 화면)
export default function HomePage() {
    return (
        <div className="min-h-screen bg-white text-slate-900">
            <Gnb />

            <main className="mx-auto flex w-full max-w-[1920px] flex-col gap-8 px-20 py-10">
                <p className="text-h2">홈 화면 준비 중</p>
            </main>
        </div>
    );
}