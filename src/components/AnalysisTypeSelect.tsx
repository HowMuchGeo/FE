import { useState, type ReactNode } from 'react';

type ProjectType = 'redevelopment' | 'reconstruction';

//사업 유형 카드
interface AnalysisCardProps {
    title: string;
    description: string;
    illustration: string;
    illustrationDefault: string;
    selected: boolean;
    onSelect: () => void;
}

function AnalysisCard({ title, description, illustration, illustrationDefault, selected, onSelect }: AnalysisCardProps) {
    const cardClass = 'flex h-60 flex-1 items-center justify-between rounded-2xl border border-sky-300 bg-sky-50 p-6 text-left';

    const content: ReactNode = (
        <>
            <div className="flex flex-1 flex-col items-start gap-3">
                <span className={`text-h2 ${selected ? 'text-slate-900' : 'text-slate-500'}`}>{title}</span>
                <span className={`text-body-lg ${selected ? 'text-slate-600' : 'text-slate-400'}`}>{description}</span>
                {selected && (
                    <button
                        type="button"
                        className="h-12 cursor-pointer rounded-lg bg-brand-700 px-5 text-label text-white transition-colors hover:bg-brand-800"
                    >
                        분석 시작하기
                    </button>
                )}
            </div>
            <div className="flex h-40 w-[180px] shrink-0 items-center justify-center">
                <img src={selected ? illustration : illustrationDefault} alt="" />
            </div>
        </>
    );

    //선택된 카드는 안에 버튼이 있어서 div, 선택 안 된 카드는 카드 전체가 버튼
    if (selected) {
        return <div className={cardClass}>{content}</div>;
    }
    return (
        <button type="button" onClick={onSelect} className={`${cardClass} cursor-pointer`}>
            {content}
        </button>
    );
}

//어떤 사업을 분석할지 선택 (재개발/재건축)
export default function AnalysisTypeSelect() {
    const [selectedType, setSelectedType] = useState<ProjectType>('redevelopment');

    return (
        <section className="flex flex-col gap-5 px-8">
            <div className="flex flex-col gap-1.5">
                <h2 className="text-h4 text-slate-900">어떤 사업을 분석하시겠어요?</h2>
                <p className="text-body-md text-slate-600">분석할 필지를 선택한 후 원하는 사업 유형을 선택해 주세요.</p>
            </div>

            <div className="flex gap-6">
                <AnalysisCard
                    title="재개발 분석"
                    description="노후 지역의 재개발 사업에 따른 예상 분담금을 분석합니다."
                    illustration="/illustrations/redevelopment-selected.svg"
                    illustrationDefault="/illustrations/redevelopment-default.svg"
                    selected={selectedType === 'redevelopment'}
                    onSelect={() => setSelectedType('redevelopment')}
                />
                <AnalysisCard
                    title="재건축 분석"
                    description="기존 공동 주택의 재건축 사업에 따른 예상 분담금을 분석합니다."
                    illustration="/illustrations/reconstruction-selected.svg"
                    illustrationDefault="/illustrations/reconstruction-default.svg"
                    selected={selectedType === 'reconstruction'}
                    onSelect={() => setSelectedType('reconstruction')}
                />
            </div>
        </section>
    );
}