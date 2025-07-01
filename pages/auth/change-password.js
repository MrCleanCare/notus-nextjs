import React, { useState } from 'react';
import { useAuth } from '../../utils/AuthContext';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import nextI18NextConfig from '../../next-i18next.config';
import Auth from 'layouts/Auth.js';

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'], nextI18NextConfig)),
    },
  };
}

export default function ChangePassword() {
  const { t } = useTranslation('common');
  const { changePassword, loading } = useAuth();
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!password || password.length < 6) {
      setError(t('password_min_length', 'كلمة المرور يجب أن تكون 6 أحرف على الأقل'));
      return;
    }
    try {
      await changePassword(password);
      setSuccess(t('password_changed', 'تم تغيير كلمة المرور بنجاح!'));
      setTimeout(() => router.replace('/'), 1500);
    } catch (err) {
      setError(err.message || t('change_password_error', 'حدث خطأ أثناء تغيير كلمة المرور'));
    }
  };

  return (
    <Auth>
      <div className="flex flex-col items-center justify-center min-h-screen py-8">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md text-center">
          <h2 className="text-2xl font-bold mb-4 text-blue-900">{t('change_password_title', 'تغيير كلمة المرور')}</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="password"
              className="border px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:border-blue-400 w-full transition-all mb-4"
              placeholder={t('new_password', 'كلمة المرور الجديدة')}
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
            {success && <div className="text-green-600 text-sm mb-2">{success}</div>}
            <button type="submit" className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-8 rounded shadow w-full transition" disabled={loading}>
              {loading ? t('loading', 'جاري التحميل...') : t('change_password', 'تغيير كلمة المرور')}
            </button>
          </form>
        </div>
      </div>
    </Auth>
  );
} 