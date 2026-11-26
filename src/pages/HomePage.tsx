import Gnb from '../components/Gnb';
import RegionSearch from '../components/RegionSearch';

//메인 홈 페이지 (로그인 후 시작 화면)
export default function HomePage() {
    return (
        <div className="min-h-screen bg-white text-slate-900">
            <Gnb />

            <main className="mx-auto flex w-full max-w-[1920px] flex-col gap-8 px-20 py-10">
                <section className="flex flex-col gap-3 rounded-2xl bg-sky-50 p-8">
                    <p className="text-caption-bold text-brand-700">재개발·재건축 사업 분석 서비스</p>
                    <h1 className="text-h2 text-slate-900">내 사업의 예상 분담금을 쉽고 정확하게 분석하세요.</h1>
                    <p className="text-body-md text-slate-600">
                        주소를 검색하거나 지도를 이용해 분석할 필지를 선택하고, 예상 분담금을 확인해 보세요.
                    </p>
                </section>
                <RegionSearch />
            </main>
        </div>
    );
}