import React from "react";
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import HeaderStats from "components/Headers/HeaderStats.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";
import { useTranslation } from 'next-i18next';

export default function Admin({ children }) {
  const { i18n } = useTranslation('common');
  const isRTL = i18n.language === 'ar';
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-gradient-to-br from-teal-50 to-blueGray-100 dark:from-blueGray-900 dark:to-blueGray-800 min-h-screen transition-all duration-300"
        style={{ fontFamily: isRTL ? 'Cairo, sans-serif' : 'Segoe UI, sans-serif', direction: isRTL ? 'rtl' : 'ltr' }}>
        <AdminNavbar />
        {/* Header */}
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          {children}
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}
