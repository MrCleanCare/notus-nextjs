import React from "react";
import { useTranslation } from 'react-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import nextI18NextConfig from '../../next-i18next.config';
import { useAuth } from '../../utils/AuthContext';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

// layout for page
import Admin from "layouts/Admin.js";

// components
import CardSettings from "components/Cards/CardSettings.js";
import CardProfile from "components/Cards/CardProfile.js";

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'], nextI18NextConfig)),
    },
  };
}

export default function Settings() {
  const { user, userName, userAvatar, role, loading } = useAuth();
  const { t } = useTranslation('common');
  const router = useRouter();
  useEffect(() => {
    if (!loading && !user) {
      router.replace('/auth/login');
    }
  }, [user, loading]);
  if (loading || !user) {
    return <div className="flex items-center justify-center min-h-screen">{t('loading', 'جاري التحميل...')}</div>;
  }
  return (
    <>
      <div className="mb-8 flex flex-col items-center">
        {userAvatar ? (
          <img src={userAvatar} alt="avatar" className="w-20 h-20 rounded-full mb-2" />
        ) : (
          <i className="fas fa-user-circle text-5xl text-blueGray-300 mb-2"></i>
        )}
        <div className="font-bold text-lg">{userName || user.email}</div>
        <div className="text-blueGray-500 text-sm">{user.email}</div>
        <div className="mt-2 text-xs bg-blue-100 text-blue-700 rounded px-2 py-1 inline-block">{role === 'admin' ? t('admin', 'أدمن') : t('user', 'مستخدم')}</div>
      </div>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-8/12 px-4">
          <CardSettings />
        </div>
        <div className="w-full lg:w-4/12 px-4">
          <CardProfile />
        </div>
      </div>
    </>
  );
}

Settings.layout = Admin;

// No user-facing strings in settings.js, only renders CardSettings and CardProfile. If those components have text, translate them in their respective files.
