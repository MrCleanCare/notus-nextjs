import React from "react";
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import nextI18NextConfig from '../../next-i18next.config';
import { useAuth } from '../../utils/AuthContext';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

// layout for page
import Admin from "layouts/Admin.js";

// components
import CardLineChart from "components/Cards/CardLineChart.js";
import CardBarChart from "components/Cards/CardBarChart.js";
import CardPageVisits from "components/Cards/CardPageVisits.js";
import CardSocialTraffic from "components/Cards/CardSocialTraffic.js";

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'], nextI18NextConfig)),
    },
  };
}

export default function Dashboard() {
  const { user, role, loading } = useAuth();
  const router = useRouter();
  const { t } = useTranslation('common');
  const [authorized, setAuthorized] = useState(false);
  useEffect(() => {
    if (!loading) {
      if (!user || role !== 'admin') {
        setAuthorized(false);
        router.replace('/');
      } else {
        setAuthorized(true);
      }
    }
  }, [user, loading, role]);
  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">{t('loading', 'جاري التحميل...')}</div>;
  }
  if (!authorized) {
    return null;
  }
  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-blue-900 mb-2">{t('admin_dashboard', 'لوحة تحكم الإدارة')}</h1>
        <p className="text-blueGray-600 mb-6">{t('dashboard_welcome', 'مرحبًا بك في لوحة تحكم عالم النظافة. يمكنك هنا متابعة الإحصائيات وإدارة الخدمات والعملاء.')}</p>
      </div>
      <div className="p-4 text-xs text-blue-700 bg-blue-100 rounded mb-4 inline-block">Role: {role}</div>
      <div className="flex flex-wrap">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <CardLineChart />
        </div>
        <div className="w-full xl:w-4/12 px-4">
          <CardBarChart />
        </div>
      </div>
      <div className="flex flex-wrap mt-4">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <CardPageVisits />
        </div>
        <div className="w-full xl:w-4/12 px-4">
          <CardSocialTraffic />
        </div>
      </div>
    </>
  );
}

Dashboard.layout = Admin;

// No user-facing strings in dashboard.js, only charts and cards. If those components have text, translate them in their respective files.
