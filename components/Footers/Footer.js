import React from "react";
import { useTranslation } from 'next-i18next';

export default function Footer() {
  const { t, i18n } = useTranslation('common');
  const isRTL = i18n.language === 'ar';
  return (
    <footer className="relative bg-gradient-to-b from-teal-50 to-blue-100 dark:from-blueGray-900 dark:to-blueGray-800 pt-8 pb-6 shadow-md drop-shadow-md transition-all duration-300 font-cairo border-t border-teal-200 dark:border-teal-700">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap text-center lg:text-left">
          <div className="w-full lg:w-6/12 px-4">
            <h4 className="text-2xl font-extrabold text-teal-700 dark:text-teal-300 mb-2 drop-shadow-sm font-cairo">{t('keep_in_touch')}</h4>
            <h5 className="text-base mt-0 mb-2 text-blueGray-600 dark:text-blueGray-200 font-medium font-cairo">
              {t('footer_subtitle')}
            </h5>
            <div className="mt-6 lg:mb-0 mb-6 flex gap-2">
              {/* Social Buttons */}
              <a className="bg-teal-50 dark:bg-blueGray-700 text-teal-600 shadow-md font-normal h-10 w-10 flex items-center justify-center rounded-full outline-none focus:outline-none hover:bg-teal-100 dark:hover:bg-blueGray-600 transition-colors duration-200" href="#" type="button">
                <i className="fab fa-twitter"></i>
              </a>
              <a className="bg-teal-50 dark:bg-blueGray-700 text-teal-700 shadow-md font-normal h-10 w-10 flex items-center justify-center rounded-full outline-none focus:outline-none hover:bg-teal-100 dark:hover:bg-blueGray-600 transition-colors duration-200" href="#" type="button">
                <i className="fab fa-facebook-square"></i>
              </a>
              <a className="bg-teal-50 dark:bg-blueGray-700 text-pink-400 shadow-md font-normal h-10 w-10 flex items-center justify-center rounded-full outline-none focus:outline-none hover:bg-teal-100 dark:hover:bg-blueGray-600 transition-colors duration-200" href="#" type="button">
                <i className="fab fa-dribbble"></i>
              </a>
              <a className="bg-teal-50 dark:bg-blueGray-700 text-blueGray-800 dark:text-blueGray-200 shadow-md font-normal h-10 w-10 flex items-center justify-center rounded-full outline-none focus:outline-none hover:bg-teal-100 dark:hover:bg-blueGray-600 transition-colors duration-200" href="#" type="button">
                <i className="fab fa-github"></i>
              </a>
            </div>
          </div>
          <div className="w-full lg:w-6/12 px-4">
            <div className="flex flex-wrap items-top mb-6">
              <div className="w-full lg:w-4/12 px-4 ml-auto">
                <span className="block uppercase text-blueGray-500 text-sm font-semibold mb-2 font-cairo">
                  {t('useful_links')}
                </span>
                <ul className="list-unstyled">
                  <li>
                    <a className="text-blueGray-600 hover:text-teal-700 font-semibold block pb-2 text-sm font-cairo" href="#">{t('about_us')}</a>
                  </li>
                  <li>
                    <a className="text-blueGray-600 hover:text-teal-700 font-semibold block pb-2 text-sm font-cairo" href="#">{t('blog')}</a>
                  </li>
                  <li>
                    <a className="text-blueGray-600 hover:text-teal-700 font-semibold block pb-2 text-sm font-cairo" href="#">{t('github')}</a>
                  </li>
                  <li>
                    <a className="text-blueGray-600 hover:text-teal-700 font-semibold block pb-2 text-sm font-cairo" href="#">{t('free_products')}</a>
                  </li>
                </ul>
              </div>
              <div className="w-full lg:w-4/12 px-4">
                <span className="block uppercase text-blueGray-500 text-sm font-semibold mb-2 font-cairo">
                  {t('other_resources')}
                </span>
                <ul className="list-unstyled">
                  <li>
                    <a className="text-blueGray-600 hover:text-teal-700 font-semibold block pb-2 text-sm font-cairo" href="#">{t('license')}</a>
                  </li>
                  <li>
                    <a className="text-blueGray-600 hover:text-teal-700 font-semibold block pb-2 text-sm font-cairo" href="#">{t('terms_conditions')}</a>
                  </li>
                  <li>
                    <a className="text-blueGray-600 hover:text-teal-700 font-semibold block pb-2 text-sm font-cairo" href="#">{t('privacy_policy')}</a>
                  </li>
                  <li>
                    <a className="text-blueGray-600 hover:text-teal-700 font-semibold block pb-2 text-sm font-cairo" href="#">{t('contact_us')}</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <hr className="my-6 border-teal-200 dark:border-teal-700" />
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
