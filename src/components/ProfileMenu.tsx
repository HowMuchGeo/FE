import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userInfo, userLogout } from '../api/user_api';

//전화번호를 010-1234-5678 형태로 표시한다 (숫자 11자리 → 3-4-4, 10자리 → 3-3-4)
//  전화번호가 아닌 값(예전 아이디 등): 유지
const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, '');
    if (digits.length === 11) return digits.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
    if (digits.length === 10) return digits.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
    return value;
};

//프로필 메뉴 항목 (아이콘 + 글자)
interface MenuItemProps {
    label: string;
    icon: string;
    hoverIcon: string;
}

function MenuItem({ label, icon, hoverIcon }: MenuItemProps) {
    return (
        <button
            type="button"
            className="group flex h-11 w-full cursor-pointer items-center gap-3 rounded-lg px-3 text-body-md text-slate-700 transition-colors hover:bg-sky-50 hover:text-brand-700"
        >
            <span className="flex size-5 items-center justify-center">
                <img src={icon} alt="" className="group-hover:hidden" />
                <img src={hoverIcon} alt="" className="hidden group-hover:block" />
            </span>
            {label}
        </button>
    );
}

//프로필 아이콘 + 프로필 메뉴
export default function ProfileMenu() {
    const navigate = useNavigate();
    const menuRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');

    //사용자 정보. 백엔드에 name 이 생기기 전 ->  전화번호·이메일 보임
    useEffect(() => {
        userInfo()
            .then((user) => {
                setName(user?.name ?? '');
                setPhone(formatPhone(user?.user_name ?? ''));
                setEmail(user?.email ?? '');
            })
            .catch((err) => {
                console.error('[ 사용자 정보 조회 오류 ] : ', err);
            });
    }, []);

    //메뉴 바깥 클릭 또는 ESC로 닫기
    useEffect(() => {
        if (!isOpen) return;

        const closeOnOutsideClick = (event: PointerEvent) => {
            if (!(event.target instanceof Node) || !menuRef.current?.contains(event.target)) {
                setIsOpen(false);
            }
        };
        const closeOnEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') setIsOpen(false);
        };

        document.addEventListener('pointerdown', closeOnOutsideClick);
        document.addEventListener('keydown', closeOnEscape);
        return () => {
            document.removeEventListener('pointerdown', closeOnOutsideClick);
            document.removeEventListener('keydown', closeOnEscape);
        };
    }, [isOpen]);

    const handleLogout = async () => {
        try {
            await userLogout();
            navigate('/login', { replace: true });
        } catch (err) {
            console.error('[ 로그아웃 오류 ] : ', err);
            alert('로그아웃 중 오류가 발생했습니다. 다시 시도해주세요.');
        }
    };

    return (
        <div ref={menuRef} className="relative">
            <button
                type="button"
                aria-label="프로필 메뉴"
                aria-expanded={isOpen}
                onClick={() => setIsOpen((prev) => !prev)}
                className="flex size-9 cursor-pointer items-center justify-center rounded-full"
            >
                <img src="/icons/gnb/profile.svg" alt="" />
            </button>

            {isOpen && (
                <div className="absolute right-0 top-full z-30 mt-2 flex w-[280px] flex-col gap-1 rounded-xl border border-slate-200 bg-white p-2 shadow-card-md">
                    <div className="flex flex-col gap-1 p-3">
                        <p className="text-label text-slate-900">{name || phone || '-'}</p>
                        <p className="text-caption text-slate-600">{name ? phone : email}</p>
                    </div>

                    <div className="h-px bg-slate-200" />

                    <div className="flex flex-col gap-1 py-3">
                        <MenuItem label="내 프로필" icon="/icons/profile-menu/profile.svg" hoverIcon="/icons/profile-menu/profile-hover.svg" />
                        <MenuItem label="계정 설정" icon="/icons/profile-menu/settings.svg" hoverIcon="/icons/profile-menu/settings-hover.svg" />
                        <MenuItem label="알림함" icon="/icons/profile-menu/alarm.svg" hoverIcon="/icons/profile-menu/alarm-hover.svg" />
                    </div>

                    <div className="h-px bg-slate-200" />

                    <button
                        type="button"
                        onClick={handleLogout}
                        className="flex h-11 w-full cursor-pointer items-center gap-3 rounded-lg px-3 text-body-md text-error transition-colors hover:bg-error-50"
                    >
                        <img src="/icons/profile-menu/logout.svg" alt="" />
                        로그아웃
                    </button>
                </div>
            )}
        </div>
    );
}