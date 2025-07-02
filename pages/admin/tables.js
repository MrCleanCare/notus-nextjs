import React from "react";
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import nextI18NextConfig from '../../next-i18next.config';

// components

import CardTable from "components/Cards/CardTable.js";

// layout for page

import Admin from "layouts/Admin.js";

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'], nextI18NextConfig)),
    },
  };
}

export default function Tables() {
  const { t } = useTranslation('common');
  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-blue-900 mb-2">{t('admin_tables', 'جداول الإدارة')}</h1>
        <p className="text-blueGray-600 mb-6">{t('tables_page_desc', 'يمكنك هنا استعراض بيانات العملاء والخدمات والحجوزات بطريقة منظمة وسهلة.')}</p>
      </div>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <CardTable />
        </div>
        <div className="w-full mb-12 px-4">
          <CardTable color="dark" />
        </div>
      </div>
    </>
  );
}

Tables.layout = Admin;

// No user-facing strings in tables.js, only renders CardTable. If that component has text, translate it in its file.
