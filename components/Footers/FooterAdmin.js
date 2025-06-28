import React from "react";
import { useTranslation } from 'next-i18next';

export default function FooterAdmin() {
  const { t, i18n } = useTranslation('common');
  const isRTL = i18n.language === 'ar';
  return (
    <>
      <footer
        className="block py-4 bg-gradient-to-t from-blueGray-100 to-teal-50 dark:from-blueGray-900 dark:to-blueGray-800 shadow-inner drop-shadow-md transition-all duration-300"
        style={{ fontFamily: isRTL ? 'Cairo, sans-serif' : 'Segoe UI, sans-serif', direction: isRTL ? 'rtl' : 'ltr' }}
      >
        <div className="container mx-auto px-4">
          <hr className="mb-4 border-b-1 border-teal-200 dark:border-teal-700" />
          <div className="flex flex-wrap items-center md:justify-between justify-center">
            <div className="w-full md:w-4/12 px-4">
              <div className="text-sm text-blueGray-500 dark:text-blueGray-200 font-semibold py-1 text-center md:text-left">
                {t('copyright', { year: new Date().getFullYear() })}{" "}
                <a
                  href="https://www.creative-tim.com?ref=nnjs-footer-admin"
                  className="text-teal-600 hover:text-teal-400 dark:text-teal-300 dark:hover:text-teal-400 text-sm font-semibold py-1 transition-colors duration-200"
                >
                  Creative Tim
                </a>
              </div>
            </div>
            <div className="w-full md:w-8/12 px-4">
              <ul className="flex flex-wrap list-none md:justify-end justify-center gap-2">
                <li>
                  <a
                    href="https://www.creative-tim.com?ref=nnjs-footer-admin"
                    className="text-teal-700 hover:text-teal-500 dark:text-teal-300 dark:hover:text-teal-400 text-sm font-semibold block py-1 px-3 transition-colors duration-200"
                  >
                    Creative Tim
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.creative-tim.com/presentation?ref=nnjs-footer-admin"
                    className="text-teal-700 hover:text-teal-500 dark:text-teal-300 dark:hover:text-teal-400 text-sm font-semibold block py-1 px-3 transition-colors duration-200"
                  >
                    {t('about_us')}
                  </a>
                </li>
                <li>
                  <a
                    href="http://blog.creative-tim.com?ref=nnjs-footer-admin"
                    className="text-teal-700 hover:text-teal-500 dark:text-teal-300 dark:hover:text-teal-400 text-sm font-semibold block py-1 px-3 transition-colors duration-200"
                  >
                    {t('blog')}
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/creativetimofficial/notus-nextjs/blob/main/LICENSE.md?ref=nnjs-footer-admin"
                    className="text-teal-700 hover:text-teal-500 dark:text-teal-300 dark:hover:text-teal-400 text-sm font-semibold block py-1 px-3 transition-colors duration-200"
                  >
                    {t('mit_license')}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
