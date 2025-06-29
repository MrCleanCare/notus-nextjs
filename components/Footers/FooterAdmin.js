import React from "react";
import { useTranslation } from 'next-i18next';

export default function FooterAdmin() {
  const { t, i18n } = useTranslation('common');
  const isRTL = i18n.language === 'ar';
  return (
    <footer className="block py-4 bg-gradient-to-t from-blueGray-100 to-teal-50 dark:from-blueGray-900 dark:to-blueGray-800 shadow-md drop-shadow-md transition-all duration-300 font-cairo border-t border-teal-200 dark:border-teal-700">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center md:justify-between justify-center">
          <div className="w-full md:w-4/12 px-4 mx-auto text-center">
            <div className="text-sm text-blueGray-500 font-semibold py-1 font-cairo">
              © {new Date().getFullYear()} {t('site_name')} - {t('all_rights_reserved')}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
