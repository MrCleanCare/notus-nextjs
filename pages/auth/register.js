import React from "react";
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import nextI18NextConfig from '../../next-i18next.config';
import Auth from "layouts/Auth.js";
import { useAuth } from '../../utils/AuthContext';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'], nextI18NextConfig)),
    },
  };
}

export default function Register() {
  const { t } = useTranslation('common');
  const { signUp, signInWithGoogle, user, loading } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      router.replace('/');
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!email || !password || !confirmPassword) {
      setError(t('all_fields_required', 'جميع الحقول مطلوبة'));
      return;
    }
    if (password !== confirmPassword) {
      setError(t('passwords_do_not_match', 'كلمتا المرور غير متطابقتين'));
      return;
    }
    if (password.length < 6) {
      setError(t('password_min_length', 'كلمة المرور يجب أن تكون 6 أحرف على الأقل'));
      return;
    }
    try {
      await signUp(email, password);
      setSuccess(t('verify_email_sent', 'تم إرسال رابط التحقق إلى بريدك الإلكتروني. يرجى التحقق لإكمال التسجيل.'));
      router.replace('/auth/verify');
    } catch (err) {
      if (err.message && err.message.toLowerCase().includes('user already registered')) {
        setError(t('email_already_registered', 'البريد الإلكتروني مسجل بالفعل'));
      } else {
        setError(err.message || t('register_error', 'خطأ في إنشاء الحساب'));
      }
    }
  };

  const handleGoogle = async () => {
    setError('');
    setSuccess('');
    try {
      await signInWithGoogle();
    } catch (err) {
      setError(err.message || t('register_error', 'خطأ في إنشاء الحساب'));
    }
  };

  return (
    <Auth>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full min-h-screen">
          <div className="w-full max-w-lg px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white border-0">
              <div className="rounded-t mb-0 px-6 py-6 bg-blue-50">
                <div className="text-center mb-3">
                  <h6 className="text-blue-900 text-lg font-bold mb-2">
                    {t('register_title', 'إنشاء حساب جديد')}
                  </h6>
                  <p className="text-blueGray-500 text-sm mb-0">
                    {t('register_subtitle', 'سجل بياناتك للانضمام إلى عالم النظافة والاستفادة من خدماتنا')}
                  </p>
                </div>
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <form onSubmit={handleSubmit}>
                  <div className="relative w-full mb-4">
                    <label className="block text-blueGray-600 text-xs font-bold mb-2" htmlFor="name">
                      {t('name', 'الاسم الكامل')}
                    </label>
                    <input
                      id="name"
                      type="text"
                      className="border px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:border-blue-400 w-full transition-all"
                      placeholder={t('name', 'الاسم الكامل')}
                    />
                  </div>
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
                  <div className="relative w-full mb-4">
                    <label className="block text-blueGray-600 text-xs font-bold mb-2" htmlFor="confirmPassword">
                      {t('confirm_password', 'تأكيد كلمة المرور')}
                    </label>
                    <input
                      id="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      onChange={e => setConfirmPassword(e.target.value)}
                      className="border px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:border-blue-400 w-full transition-all mb-4"
                      placeholder={t('confirm_password', 'تأكيد كلمة المرور')}
                    />
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <label className="inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="form-checkbox text-blue-700 w-5 h-5" />
                      <span className="ml-2 text-sm text-blueGray-600">{t('agree_terms', 'أوافق على الشروط والأحكام')}</span>
                    </label>
                  </div>
                  {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
                  {success && <div className="text-green-600 text-sm mb-2">{success}</div>}
                  <div className="text-center mt-6">
                    <button
                      type="submit"
                      className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-8 rounded shadow w-full transition"
                    >
                      {loading ? t('loading', 'جاري التحميل...') : t('register', 'تسجيل حساب جديد')}
                    </button>
                  </div>
                  <button type="button" onClick={handleGoogle} className="w-full mt-4 flex items-center justify-center border border-gray-300 rounded py-2 bg-white hover:bg-gray-50">
                    <img src="/public/img/google.svg" alt="Google" className="w-5 h-5 mr-2" />
                    {t('register_with_google', 'التسجيل عبر جوجل')}
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
