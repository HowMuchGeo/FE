import { useState } from 'react';

type SearchMethod = 'address' | 'map';

//검색 방식 탭 버튼
interface TabButtonProps {
    label: string;
    selected: boolean;
    onClick: () => void;
}

function TabButton({ label, selected, onClick }: TabButtonProps) {
    return (
        <button
            type="button"
            role="tab"
            aria-selected={selected}
            onClick={onClick}
            className={`h-14 flex-1 rounded-lg transition-colors ${
                selected ? 'bg-sky-200 text-title-sm text-brand-700' : 'bg-slate-50 text-body-lg text-slate-600'
            }`}
        >
            {label}
        </button>
    );
}

//분석할 지역 선택 (주소로 찾기/지도로 찾기)
export default function RegionSearch() {
    const [method, setMethod] = useState<SearchMethod>('address');
    const [address, setAddress] = useState('');

    return (
        <section className="flex flex-col gap-5 rounded-2xl border border-slate-200 bg-white px-8 py-7 shadow-card">
            <div className="flex flex-col gap-1.5">
                <h2 className="text-h4 text-slate-900">분석할 지역을 선택해 주세요.</h2>
                <p className="text-body-md text-slate-600">주소를 검색하거나 지도에서 직접 위치를 선택할 수 있습니다.</p>
            </div>

            <div role="tablist" className="flex gap-2 rounded-lg bg-slate-50 p-1">
                <TabButton label="주소로 찾기" selected={method === 'address'} onClick={() => setMethod('address')} />
                <TabButton label="지도로 찾기" selected={method === 'map'} onClick={() => setMethod('map')} />
            </div>

            {method === 'address' && (
                <div className="flex flex-col gap-2">
                    <div className="flex gap-3">
                        <label className="group flex h-14 flex-1 items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 focus-within:border-brand-700 focus-within:ring-1 focus-within:ring-brand-700">
                            <img src="/icons/home/search.svg" alt="" className="group-focus-within:hidden" />
                            <img src="/icons/home/search-focus.svg" alt="" className="hidden group-focus-within:block" />
                            <input
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                placeholder="도로명 또는 지번 주소를 입력해 주세요."
                                className="min-w-0 flex-1 bg-transparent text-body-lg text-slate-700 outline-none placeholder:text-slate-500"
                            />
                        </label>
                        <button
                            type="button"
                            className="h-14 w-[100px] rounded-lg bg-brand-700 text-label text-white transition-colors hover:bg-brand-800"
                        >
                            검색
                        </button>
                    </div>
                    <p className="text-caption text-slate-500">주소를 입력하면 해당 위치로 지도가 이동합니다.</p>
                </div>
            )}
        </section>
    );
}