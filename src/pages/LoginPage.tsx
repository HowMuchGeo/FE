/// <reference types="vite/client" />

import { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { Link } from 'react-router-dom';
import { useLoginPage } from '../hooks/useLoginPage';

//로그인 페이지
export default function LoginPage() {

    //LoginPage Hook 사용
    const {
        loginButtonAction,
        handleCaptchaChange,
        setUserName,
        setPassword,
        isFormValid,
        loginAttempted,
    } = useLoginPage();

    const [showPassword, setShowPassword] = useState(false);
    const [keepLogin, setKeepLogin] = useState(false);

    //입력창 테두리 : 실패 시 빨간색
    const inputBorderClass = loginAttempted
        ? 'border-error'
        : 'border-slate-300 focus-within:border-brand-700 focus-within:ring-1 focus-within:ring-brand-700';

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 p-10">
            <div className="flex flex-col items-center gap-2 pb-8">
                <div className="size-14 bg-brand-800" />
                <p className="text-h3 text-brand-800">얼마GEO</p>
                <p className="text-body-md text-slate-600">재개발·재건축 사업 분석 서비스</p>
            </div>

            <main className="flex w-[480px] flex-col gap-6 rounded-2xl border border-slate-200 bg-white p-10 shadow-card-md">
                <div className="flex flex-col gap-2">
                    <h1 className="text-h2 text-slate-900">로그인</h1>
                    <p className="text-body-md text-slate-600">전화번호와 비밀번호를 입력해 주세요.</p>
                </div>

                <form className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="login-phone" className="text-label text-slate-800">전화번호</label>
                        <div className={`flex h-14 items-center rounded-lg border bg-white px-4 ${inputBorderClass}`}>
                            <input
                                id="login-phone"
                                type="tel"
                                autoComplete="username"
                                placeholder="010-0000-0000"
                                onChange={(e) => setUserName(e.target.value)}
                                className="min-w-0 flex-1 bg-transparent text-body-lg text-slate-700 outline-none placeholder:text-slate-500"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="login-password" className="text-label text-slate-800">비밀번호</label>
                        <div className={`flex h-14 items-center gap-2 rounded-lg border bg-white px-4 ${inputBorderClass}`}>
                            <input
                                id="login-password"
                                type={showPassword ? 'text' : 'password'}
                                autoComplete="current-password"
                                placeholder="비밀번호를 입력하세요"
                                onChange={(e) => setPassword(e.target.value)}
                                className="min-w-0 flex-1 bg-transparent text-body-lg text-slate-700 outline-none placeholder:text-slate-500"
                            />
                            <button
                                type="button"
                                aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="cursor-pointer"
                            >
                                <img src={showPassword ? '/icons/login/eye-closed.svg' : '/icons/login/eye-open.svg'} alt="" />
                            </button>
                        </div>
                    </div>

                    <div className="flex h-6 items-center justify-between">
                        <label className="flex cursor-pointer items-center gap-2 text-body-md text-slate-700">
                            <input
                                type="checkbox"
                                checked={keepLogin}
                                onChange={(e) => setKeepLogin(e.target.checked)}
                                className="peer sr-only"
                            />
                            <span className="size-5 rounded border border-slate-700 bg-white peer-checked:hidden" />
                            <img src="/icons/login/checkbox-checked.svg" alt="" className="hidden peer-checked:block" />
                            로그인 상태 유지
                        </label>
                        <button type="button" className="cursor-pointer text-caption-bold text-brand-700">
                            비밀번호 찾기
                        </button>
                    </div>

                    <div className="flex justify-center">
                        <ReCAPTCHA
                            sitekey={import.meta.env.VITE_GOOGLE_RECAPTCHA_API}
                            onChange={handleCaptchaChange}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={!isFormValid}
                        onClick={loginButtonAction}
                        className="h-14 w-full cursor-pointer rounded-lg bg-brand-700 text-label text-white transition-colors enabled:hover:bg-brand-800 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
                    >
                        로그인
                    </button>
                </form>

                <div className="flex items-center gap-4">
                    <span className="h-px flex-1 bg-slate-400" />
                    <span className="text-caption text-slate-400">아직 회원이 아니신가요?</span>
                    <span className="h-px flex-1 bg-slate-400" />
                </div>

                <Link
                    to="/signup"
                    className="flex h-14 w-full items-center justify-center rounded-lg border border-slate-300 bg-white text-label text-brand-700 transition-colors hover:bg-sky-50"
                >
                    회원가입
                </Link>
            </main>

            <footer className="pt-8">
                <p className="font-roboto-mono text-caption text-slate-400">© HowMuchGEO. All rights reserved.</p>
            </footer>
        </div>
    );
}