import React from "react";
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import nextI18NextConfig from '../../next-i18next.config';
import { useAuth } from '../../utils/AuthContext';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

// components

import MapExample from "components/Maps/MapExample.js";

// layout for page

import Admin from "layouts/Admin.js";

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'], nextI18NextConfig)),
    },
  };
}

export default function Maps() {
  const { t } = useTranslation('common');
  const { user, loading } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!loading && !user) {
      router.replace('/auth/login');
    }
  }, [user, loading]);
  if (loading || !user) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }
  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-blue-900 mb-2">{t('admin_maps', 'خريطة العملاء والخدمات')}</h1>
        <p className="text-blueGray-600 mb-6">{t('maps_page_desc', 'يمكنك هنا استعراض مواقع العملاء والخدمات على الخريطة لتسهيل المتابعة والتخطيط.')}</p>
      </div>
      <div className="flex flex-wrap">
        <div className="w-full px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <MapExample />
          </div>
        </div>
      </div>
    </>
  );
}

Maps.layout = Admin;
