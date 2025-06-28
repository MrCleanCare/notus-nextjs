import React, { useEffect, useState } from "react";
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import nextI18NextConfig from '../next-i18next.config';
import Navbar from "components/Navbars/AuthNavbar.js";
import Footer from "components/Footers/Footer.js";

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'], nextI18NextConfig)),
    },
  };
}

export default function Profile() {
  const { t } = useTranslation('common');
  const [isRTL, setIsRTL] = useState(false);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsRTL(document.documentElement.dir === 'rtl');
    }
  }, []);

  return (
    <>
      <Navbar transparent />
      {/* About Company Section */}
      <section className="relative pt-24 flex items-center min-h-[60vh] bg-gradient-to-br from-blue-100 to-blue-50">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="w-full md:w-1/2 px-4 text-center md:text-start">
            <h1 className="font-extrabold text-4xl md:text-5xl text-blue-900 mb-4 leading-tight">
              {t('about_company', 'عن عالم النظافة')}
            </h1>
            <p className="text-lg md:text-xl text-blueGray-600 mb-6">
              {t('about_company_desc', 'شركة رائدة في تقديم خدمات التنظيف المتكاملة في جدة، نتميز بالجودة، الأمانة، والابتكار في كل ما نقدمه.')}
            </p>
          </div>
          <div className="w-full md:w-1/2 px-4 mt-12 md:mt-0 flex justify-center">
            <img
              className={`w-full max-w-xs rounded-lg shadow-lg ${isRTL ? 'scale-x-[-1]' : ''}`}
              style={isRTL ? {transform: 'scaleX(-1)'} : {}}
              src="/img/landing.jpg"
              alt="about company"
            />
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-blue-900 mb-12">{t('our_team', 'فريقنا')}</h2>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="bg-blue-50 rounded-lg shadow p-8 w-72 text-center flex flex-col items-center">
              <img src="/img/team-1-800x800.jpg" alt="team1" className="w-24 h-24 rounded-full mb-4" />
              <h4 className="font-semibold text-lg mb-2">{t('team_leader', 'أ. محمد الغامدي')}</h4>
              <p className="text-blueGray-600">{t('team_leader_role', 'المدير التنفيذي')}</p>
            </div>
            <div className="bg-blue-50 rounded-lg shadow p-8 w-72 text-center flex flex-col items-center">
              <img src="/img/team-2-800x800.jpg" alt="team2" className="w-24 h-24 rounded-full mb-4" />
              <h4 className="font-semibold text-lg mb-2">{t('team_supervisor', 'م. سارة العتيبي')}</h4>
              <p className="text-blueGray-600">{t('team_supervisor_role', 'مشرفة الجودة')}</p>
            </div>
            <div className="bg-blue-50 rounded-lg shadow p-8 w-72 text-center flex flex-col items-center">
              <img src="/img/team-3-800x800.jpg" alt="team3" className="w-24 h-24 rounded-full mb-4" />
              <h4 className="font-semibold text-lg mb-2">{t('team_support', 'أ. أحمد الزهراني')}</h4>
              <p className="text-blueGray-600">{t('team_support_role', 'دعم العملاء')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Company Values Section */}
      <section className="py-20 bg-blue-50">
        <div className="container mx-auto flex flex-col md:flex-row gap-12 items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full md:w-1/3 text-center">
            <span className="text-4xl mb-4 text-blue-700"><i className="fas fa-heart"></i></span>
            <h4 className="font-bold text-xl mb-2">{t('our_values', 'قيمنا')}</h4>
            <p className="text-blueGray-600">{t('values_text', 'الالتزام، الأمانة، الجودة، الابتكار، رضا العميل.')}</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-8 w-full md:w-1/3 text-center">
            <span className="text-4xl mb-4 text-blue-700"><i className="fas fa-bullseye"></i></span>
            <h4 className="font-bold text-xl mb-2">{t('our_mission', 'رسالتنا')}</h4>
            <p className="text-blueGray-600">{t('mission_text', 'تقديم خدمات تنظيف بمعايير عالمية تلبي تطلعات عملائنا وتفوق توقعاتهم.')}</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-8 w-full md:w-1/3 text-center">
            <span className="text-4xl mb-4 text-blue-700"><i className="fas fa-eye"></i></span>
            <h4 className="font-bold text-xl mb-2">{t('our_vision', 'رؤيتنا')}</h4>
            <p className="text-blueGray-600">{t('vision_text', 'أن نكون الخيار الأول في خدمات التنظيف بجدة من خلال الجودة والابتكار.')}</p>
          </div>
        </div>
      </section>

      {/* Company Achievements Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-blue-900 mb-12">{t('achievements', 'إنجازاتنا')}</h2>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="bg-blue-50 rounded-lg shadow p-8 w-72 text-center flex flex-col items-center">
              <span className="text-4xl mb-4 text-blue-700"><i className="fas fa-users"></i></span>
              <h4 className="font-semibold text-lg mb-2">{t('clients_served', 'أكثر من 500 عميل سعيد')}</h4>
            </div>
            <div className="bg-blue-50 rounded-lg shadow p-8 w-72 text-center flex flex-col items-center">
              <span className="text-4xl mb-4 text-blue-700"><i className="fas fa-star"></i></span>
              <h4 className="font-semibold text-lg mb-2">{t('years_experience', '10 سنوات خبرة')}</h4>
            </div>
            <div className="bg-blue-50 rounded-lg shadow p-8 w-72 text-center flex flex-col items-center">
              <span className="text-4xl mb-4 text-blue-700"><i className="fas fa-medal"></i></span>
              <h4 className="font-semibold text-lg mb-2">{t('awards', 'جوائز وشهادات جودة')}</h4>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
