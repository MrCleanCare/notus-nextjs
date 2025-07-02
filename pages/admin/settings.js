import React from "react";
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import nextI18NextConfig from '../../next-i18next.config';

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
  const { t } = useTranslation('common');
  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-blue-900 mb-2">{t('admin_settings', 'إعدادات الإدارة')}</h1>
        <p className="text-blueGray-600 mb-6">{t('settings_page_desc', 'يمكنك هنا تعديل بيانات الحساب وإعدادات النظام الخاصة بعالم النظافة.')}</p>
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
