import ProfileMenu from './ProfileMenu';

//상단 메뉴 항목
interface GnbMenuItemProps {
    label: string;
    icon: string;
    hoverIcon: string;
}

function GnbMenuItem({ label, icon, hoverIcon }: GnbMenuItemProps) {
    return (
        <button
            type="button"
            className="group flex h-11 items-center gap-2 rounded-lg p-2 text-body-md text-slate-700 transition-colors hover:bg-sky-50 hover:text-brand-700"
        >
            <span className="flex size-5 items-center justify-center">
                <img src={icon} alt="" className="group-hover:hidden" />
                <img src={hoverIcon} alt="" className="hidden group-hover:block" />
            </span>
            {label}
        </button>
    );
}

//상단 메뉴
export default function Gnb() {
    return (
        <header className="flex h-[81px] items-center justify-between border-b border-slate-200 bg-white px-10">
            <div className="flex items-center gap-2">
                <div className="size-6 rounded-lg bg-brand-700" />
                <span className="text-h4 text-brand-800">얼마GEO</span>
            </div>

            <nav className="flex items-center gap-6">
                <GnbMenuItem label="내 폴더" icon="/icons/gnb/folder.svg" hoverIcon="/icons/gnb/folder-hover.svg" />
                <GnbMenuItem label="조합 관리" icon="/icons/gnb/association.svg" hoverIcon="/icons/gnb/association-hover.svg" />
                <GnbMenuItem label="설정" icon="/icons/gnb/settings.svg" hoverIcon="/icons/gnb/settings-hover.svg" />
                <ProfileMenu />
            </nav>
        </header>
    );
}