import React from "react";
import Link from "next/link";
import IndexDropdown from "components/Dropdowns/IndexDropdown.js";
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

export default function Navbar(props) {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  const { t, i18n } = useTranslation('common');
  const router = useRouter();
  const isRTL = i18n.language === 'ar';
  const switchLanguage = () => {
    const nextLocale = router.locale === 'ar' ? 'en' : 'ar';
    router.push(router.pathname, router.asPath, { locale: nextLocale });
  };
  return (
    <>
      <nav
        className={`top-0 fixed z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-white/90 dark:bg-blueGray-900/90 shadow-md backdrop-blur-md transition-all duration-300 ${isRTL ? 'rtl' : 'ltr'}`}
        style={{ fontFamily: isRTL ? 'Cairo, sans-serif' : 'Segoe UI, sans-serif', direction: isRTL ? 'rtl' : 'ltr' }}
      >
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link href="/" className="text-teal-600 dark:text-teal-400 text-lg font-extrabold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase tracking-widest drop-shadow-sm transition-colors duration-200">
              {t('notus_nextjs')}
            </Link>
            <button
              className="cursor-pointer text-2xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none hover:bg-teal-50 dark:hover:bg-blueGray-800 transition-colors duration-200"
              type="button"
              aria-label="Toggle navigation menu"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i className="fas fa-bars"></i>
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center bg-white/90 dark:bg-blueGray-900/90 lg:bg-opacity-0 lg:shadow-none shadow-md rounded-xl mt-2 lg:mt-0 transition-all duration-300" +
              (navbarOpen ? " block" : " hidden")
            }
            id="example-navbar-warning"
          >
            <ul className="flex flex-col lg:flex-row list-none mr-auto gap-2">
              <li className="flex items-center">
                <a
                  className="hover:text-teal-500 text-teal-600 dark:text-teal-400 px-3 py-4 lg:py-2 flex items-center text-xs md:text-sm uppercase font-bold transition-colors duration-200"
                  href="https://www.creative-tim.com/learning-lab/tailwind/nextjs/overview/notus?ref=nnjs-index-navbar"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <i className="text-teal-400 far fa-file-alt text-lg leading-lg mr-2" />{" "}
                  {t('docs')}
                </a>
              </li>
            </ul>
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto gap-2">
              <li className="flex items-center">
                <IndexDropdown />
              </li>
              <li className="flex items-center">
                <a
                  className="hover:text-teal-500 text-teal-600 dark:text-teal-400 px-3 py-4 lg:py-2 flex items-center text-xs md:text-sm uppercase font-bold transition-colors duration-200"
                  href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdemos.creative-tim.com%2Fnotus-nextjs%2F"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <i className="text-teal-400 fab fa-facebook text-lg leading-lg " />
                  <span className="lg:hidden inline-block ml-2">{t('share')}</span>
                </a>
              </li>
              <li className="flex items-center">
                <a
                  className="hover:text-teal-500 text-teal-600 dark:text-teal-400 px-3 py-4 lg:py-2 flex items-center text-xs md:text-sm uppercase font-bold transition-colors duration-200"
                  href="https://twitter.com/intent/tweet?url=https%3A%2F%2Fdemos.creative-tim.com%2Fnotus-nextjs%2F&text=Start%20your%20development%20with%20a%20Free%20Tailwind%20CSS%20and%20NextJS%20UI%20Kit%20and%20Admin.%20Let%20Notus%20NextJS%20amaze%20you%20with%20its%20cool%20features%20and%20build%20tools%20and%20get%20your%20project%20to%20a%20whole%20new%20level."
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <i className="text-teal-400 fab fa-twitter text-lg leading-lg " />
                  <span className="lg:hidden inline-block ml-2">{t('tweet')}</span>
                </a>
              </li>
              <li className="flex items-center">
                <a
                  className="hover:text-teal-500 text-teal-600 dark:text-teal-400 px-3 py-4 lg:py-2 flex items-center text-xs md:text-sm uppercase font-bold transition-colors duration-200"
                  href="https://github.com/creativetimofficial/notus-nextjs?ref=nnjs-index-navbar"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <i className="text-teal-400 fab fa-github text-lg leading-lg " />
                  <span className="lg:hidden inline-block ml-2">{t('star')}</span>
                </a>
              </li>
              <li className="flex items-center">
                <button
                  className="bg-teal-600 dark:bg-teal-500 text-white active:bg-teal-500 dark:active:bg-teal-400 text-xs md:text-sm font-bold uppercase px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150 drop-shadow-md"
                  type="button"
                  onClick={switchLanguage}
                >
                  <i className="fas fa-language"></i> {t('switch_language')}
                </button>
              </li>
              <li className="flex items-center">
                <button
                  className="bg-teal-600 dark:bg-teal-500 text-white active:bg-teal-500 dark:active:bg-teal-400 text-xs md:text-sm font-bold uppercase px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150 drop-shadow-md"
                  type="button"
                >
                  <i className="fas fa-arrow-alt-circle-down"></i> {t('download')}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
