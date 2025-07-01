import React from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import nextI18NextConfig from '../../next-i18next.config';
import Auth from 'layouts/Auth.js';
import { useAuth } from '../../utils/AuthContext';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'], nextI18NextConfig)),
    },
  };
}

export default function Verify() {
  const { t } = useTranslation('common');
  const { user } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (user) {
      router.replace('/profile');
    }
  }, [user]);
  return (
    <Auth>
      <div className="flex flex-col items-center justify-center min-h-screen py-8">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md text-center">
          <h2 className="text-2xl font-bold mb-4 text-blue-900">{t('verify_email_title', 'تأكيد البريد الإلكتروني')}</h2>
          <p className="text-blueGray-600 mb-4">{t('verify_email_message', 'تم إرسال رابط التحقق إلى بريدك الإلكتروني. يرجى التحقق لإكمال التسجيل.')}</p>
        </div>
      </div>
    </Auth>
  );
} 