import React from "react";
import Link from "next/link";
import IndexDropdown from "components/Dropdowns/IndexDropdown.js";
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

export default function Navbar() {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  const { t, i18n } = useTranslation('common');
  const router = useRouter();
  const isRTL = i18n.language === 'ar';
  const switchLanguage = () => {
    const nextLocale = router.locale === 'ar' ? 'en' : 'ar';
    router.push(router.pathname, router.asPath, { locale: nextLocale });
  };

  return (
    <nav
      className={`top-0 fixed z-50 w-full bg-white dark:bg-blueGray-900 border-b border-teal-200 dark:border-teal-700 shadow-md font-cairo transition-all duration-200 ${isRTL ? 'rtl' : 'ltr'}`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="container mx-auto px-4 flex flex-row items-center justify-between h-20">
        {/* Logo/Brand */}
        <div className="flex-1 flex items-center justify-start">
          <Link href="/" legacyBehavior>
            <a className="text-teal-700 dark:text-teal-300 text-xl font-extrabold tracking-widest uppercase font-cairo hover:text-teal-600 transition-colors duration-200">
              {t('site_name')}
            </a>
          </Link>
        </div>
        {/* Main Nav Actions */}
        <div className="flex-1 flex items-center justify-center gap-2">
          <a
            className="pl-btn hover:text-teal-700 text-teal-700 border border-solid border-teal-600 bg-teal-50 dark:bg-blueGray-800 px-4 py-2 flex items-center text-sm uppercase font-bold rounded transition-colors duration-200 font-cairo shadow-sm"
            href="https://www.creative-tim.com/learning-lab/tailwind/nextjs/overview/notus?ref=nnjs-index-navbar"
          >
            <i className="text-teal-600 far fa-file-alt text-lg leading-lg mr-2" /> {t('docs')}
          </a>
          <IndexDropdown />
        </div>
        {/* Actions: Language, Download, Social */}
        <div className="flex-1 flex items-center justify-end gap-2">
          <button
            onClick={switchLanguage}
            className="pl-btn border border-solid border-teal-600 text-teal-700 bg-teal-50 dark:bg-blueGray-800 hover:bg-teal-100 dark:hover:bg-blueGray-700 text-sm font-bold uppercase px-4 py-2 rounded shadow-md outline-none focus:outline-none transition-all duration-150 font-cairo"
            type="button"
          >
            <i className="fas fa-language text-teal-600 mr-2"></i>
            {t('switch_language')}
          </button>
          <button
            className="pl-btn border border-solid border-teal-600 text-teal-700 bg-teal-50 dark:bg-blueGray-800 active:bg-teal-100 text-sm font-bold uppercase px-4 py-2 rounded shadow-md outline-none focus:outline-none transition-all duration-150 font-cairo"
            type="button"
          >
            <i className="fas fa-arrow-alt-circle-down text-teal-600"></i> <span className="text-teal-700">{t('download')}</span>
          </button>
          <a
            className="pl-btn hover:text-teal-700 text-teal-700 border border-solid border-teal-600 bg-teal-50 dark:bg-blueGray-800 px-3 py-2 flex items-center text-sm uppercase font-bold rounded transition-colors duration-200 font-cairo shadow-sm"
            href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdemos.creative-tim.com%2Fnotus-nextjs%2F"
            target="_blank"
            rel="noreferrer noopener"
          >
            <i className="text-teal-600 fab fa-facebook text-lg leading-lg " />
          </a>
          <a
            className="pl-btn hover:text-teal-700 text-teal-700 border border-solid border-teal-600 bg-teal-50 dark:bg-blueGray-800 px-3 py-2 flex items-center text-sm uppercase font-bold rounded transition-colors duration-200 font-cairo shadow-sm"
            href="https://twitter.com/intent/tweet?url=https%3A%2F%2Fdemos.creative-tim.com%2Fnotus-nextjs%2F&text=Start%20your%20development%20with%20a%20Free%20Tailwind%20CSS%20and%20NextJS%20UI%20Kit%20and%20Admin.%20Let%20Notus%20NextJS%20amaze%20you%20with%20its%20cool%20features%20and%20build%20tools%20and%20get%20your%20project%20to%20a%20whole%20new%20level."
            target="_blank"
            rel="noreferrer noopener"
          >
            <i className="text-teal-600 fab fa-twitter text-lg leading-lg " />
          </a>
          <a
            className="pl-btn hover:text-teal-700 text-teal-700 border border-solid border-teal-600 bg-teal-50 dark:bg-blueGray-800 px-3 py-2 flex items-center text-sm uppercase font-bold rounded transition-colors duration-200 font-cairo shadow-sm"
            href="https://github.com/creativetimofficial/notus-nextjs?ref=nnjs-index-navbar"
            target="_blank"
            rel="noreferrer noopener"
          >
            <i className="text-teal-600 fab fa-github text-lg leading-lg " />
          </a>
        </div>
      </div>
    </nav>
  );
}
