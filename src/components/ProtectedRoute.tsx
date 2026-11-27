import { useEffect, useState, type ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { userInfo } from '../api/user_api';

type AuthStatus = 'checking' | 'authenticated' | 'guest';

//로그인 안 된 상태면 /login 페이지로 이동
export default function ProtectedRoute({ children }: { children: ReactNode }) {
    const [status, setStatus] = useState<AuthStatus>('checking');

    useEffect(() => {
        let cancelled = false;

        userInfo()
            .then((user) => {
                if (!cancelled) setStatus(user?.user_name ? 'authenticated' : 'guest');
            })
            .catch(() => {
                if (!cancelled) setStatus('guest');
            });

        return () => {
            cancelled = true;
        };
    }, []);

    if (status === 'checking') {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-50 text-body-md text-slate-500">
                로그인 상태를 확인하고 있어요...
            </div>
        );
    }

    if (status === 'guest') {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
}