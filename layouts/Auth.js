import React from "react";
import Navbar from "components/Navbars/AuthNavbar.js";
import FooterSmall from "components/Footers/FooterSmall.js";
import { useTranslation } from 'next-i18next';

export default function Auth({ children }) {
  const { i18n } = useTranslation('common');
  const isRTL = i18n.language === 'ar';
  return (
    <>
      <Navbar transparent />
      <main style={{ fontFamily: isRTL ? 'Cairo, sans-serif' : 'Segoe UI, sans-serif', direction: isRTL ? 'rtl' : 'ltr' }}>
        <section className="relative w-full h-full py-40 min-h-screen bg-gradient-to-br from-teal-50 to-blueGray-100 dark:from-blueGray-900 dark:to-blueGray-800 transition-all duration-300">
          <div
            className="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-full opacity-80"
            style={{
              backgroundImage: "url('/img/register_bg_2.png')",
            }}
          ></div>
          {children}
          <FooterSmall absolute />
        </section>
      </main>
    </>
  );
}
