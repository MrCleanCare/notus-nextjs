import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import nextI18NextConfig from '../../next-i18next.config';
import Auth from "layouts/Auth.js";
import { useAuth } from '../../utils/AuthContext';
import { useRouter } from 'next/router';

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'], nextI18NextConfig)),
    },
  };
}

export default function Login() {
  const { t } = useTranslation('common');
  const { signIn, signInWithGoogle, user, loading, requireEmailVerification, requirePasswordChange } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Redirect if already logged in
  useEffect(() => {
    if (user && !requireEmailVerification && !requirePasswordChange) {
      router.replace('/');
    } else if (requireEmailVerification) {
      router.replace('/auth/verify');
    } else if (requirePasswordChange) {
      router.replace('/auth/change-password');
    }
  }, [user, requireEmailVerification, requirePasswordChange]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError(t('all_fields_required', 'جميع الحقول مطلوبة'));
      return;
    }
    try {
      await signIn(email, password);
    } catch (err) {
      if (err.message && err.message.toLowerCase().includes('email not confirmed')) {
        setError(t('email_not_confirmed', 'يرجى تفعيل بريدك الإلكتروني أولاً'));
      } else if (err.message && err.message.toLowerCase().includes('invalid login credentials')) {
        setError(t('invalid_login_credentials', 'البريد الإلكتروني أو كلمة المرور غير صحيحة'));
      } else {
        setError(err.message || t('login_error', 'خطأ في تسجيل الدخول'));
      }
    }
  };

  const handleGoogle = async () => {
    setError('');
    try {
      await signInWithGoogle();
    } catch (err) {
      setError(err.message || t('login_error', 'خطأ في تسجيل الدخول'));
    }
  };

  return (
    <Auth>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full min-h-screen">
          <div className="w-full max-w-md px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white border-0">
              <div className="rounded-t mb-0 px-6 py-6 bg-blue-50">
                <div className="text-center mb-3">
                  <h6 className="text-blue-900 text-lg font-bold mb-2">
                    {t('login_title', 'تسجيل الدخول إلى حسابك')}
                  </h6>
                  <p className="text-blueGray-500 text-sm mb-0">
                    {t('login_subtitle', 'ادخل بياناتك للوصول إلى خدمات عالم النظافة')}
                  </p>
                </div>
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <form onSubmit={handleSubmit}>
                  <div className="relative w-full mb-4">
                    <label className="block text-blueGray-600 text-xs font-bold mb-2" htmlFor="email">
                      {t('email', 'البريد الإلكتروني')}
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="border px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:border-blue-400 w-full transition-all"
                      placeholder={t('email', 'البريد الإلكتروني')}
                    />
                  </div>
                  <div className="relative w-full mb-4">
                    <label className="block text-blueGray-600 text-xs font-bold mb-2" htmlFor="password">
                      {t('password', 'كلمة المرور')}
                    </label>
                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      className="border px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:border-blue-400 w-full transition-all"
                      placeholder={t('password', 'كلمة المرور')}
                    />
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <label className="inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="form-checkbox text-blue-700 w-5 h-5" />
                      <span className="ml-2 text-sm text-blueGray-600">{t('remember_me', 'تذكرني')}</span>
                    </label>
                    <Link href="/auth/register" className="text-blue-700 text-sm font-semibold hover:underline">
                      {t('no_account', 'ليس لديك حساب؟ سجل الآن')}
                    </Link>
                  </div>
                  {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
                  <div className="text-center mt-6">
                    <button
                      className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-8 rounded shadow w-full transition"
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? t('loading', 'جاري التحميل...') : t('login', 'تسجيل الدخول')}
                    </button>
                  </div>
                  <button type="button" onClick={handleGoogle} className="w-full mt-4 flex items-center justify-center border border-gray-300 rounded py-2 bg-white hover:bg-gray-50" disabled={loading}>
                    <img src="/public/img/google.svg" alt="Google" className="w-5 h-5 mr-2" />
                    {t('login_with_google', 'تسجيل الدخول عبر جوجل')}
                  </button>
                </form>
              </div>
            </div>
            <div className="flex flex-col items-center mt-4">
              <span className="text-blueGray-400 text-xs">{t('copyright', '© جميع الحقوق محفوظة عالم النظافة')}</span>
            </div>
          </div>
        </div>
      </div>
    </Auth>
  );
}
