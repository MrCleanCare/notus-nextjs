import React from "react";
import { useTranslation } from 'next-i18next';

// components

export default function CardProfile() {
  const { t, i18n } = useTranslation('common');
  const isRTL = i18n.language === 'ar';
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-2xl mt-16 drop-shadow-md transition-all duration-300"
        style={{ fontFamily: isRTL ? 'Cairo, sans-serif' : 'Segoe UI, sans-serif', direction: isRTL ? 'rtl' : 'ltr' }}>
        <div className="px-6">
          <div className="flex flex-wrap justify-center">
            <div className="w-full px-4 flex justify-center">
              <div className="relative">
                <img
                  alt="..."
                  src="/img/team-2-800x800.jpg"
                  className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                />
              </div>
            </div>
            <div className="w-full px-4 text-center mt-20">
              <div className="flex justify-center py-4 lg:pt-4 pt-8">
                <div className="mr-4 p-3 text-center">
                  <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                    22
                  </span>
                  <span className="text-sm text-blueGray-400">{t('friends')}</span>
                </div>
                <div className="mr-4 p-3 text-center">
                  <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                    10
                  </span>
                  <span className="text-sm text-blueGray-400">{t('photos')}</span>
                </div>
                <div className="lg:mr-4 p-3 text-center">
                  <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                    89
                  </span>
                  <span className="text-sm text-blueGray-400">{t('comments')}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-12">
            <h3 className="text-xl md:text-2xl font-extrabold leading-normal text-teal-700 dark:text-teal-300 mb-2 drop-shadow-sm transition-colors duration-200">
              {t('jenna_stones')}
            </h3>
            <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
              <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>{" "}
              {t('los_angeles')}
            </div>
            <div className="mb-2 text-blueGray-600 mt-10">
              <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
              {t('solution_manager')}
            </div>
            <div className="mb-2 text-blueGray-600">
              <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>
              {t('university_of_computer_science')}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
