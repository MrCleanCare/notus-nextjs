/* eslint-disable react/jsx-no-target-blank */
import React, { useEffect, useState } from "react";
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import nextI18NextConfig from '../next-i18next.config';
import Link from "next/link";
import "@fontsource/cairo/400.css";
import "@fontsource/cairo/700.css";
import "../styles/arabic-font.css";

import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footers/Footer.js";

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'], nextI18NextConfig)),
    },
  };
}

export default function Index() {
  const { t } = useTranslation('common');
  const [isRTL, setIsRTL] = useState(false);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsRTL(document.documentElement.dir === 'rtl');
    }
  }, []);

  return (
    <div style={{ fontFamily: isRTL ? 'Cairo, sans-serif' : 'inherit' }}>
      <IndexNavbar fixed />
      {/* Hero Section */}
      <section className="header relative pt-24 flex items-center min-h-[80vh] bg-gradient-to-br from-blue-100 to-blue-50">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="w-full md:w-1/2 px-4 text-center md:text-start">
            <img src="/img/brand/apple-icon.png" alt="logo" className="mx-auto md:mx-0 mb-6 w-24 h-24" />
            <h1 className="font-extrabold text-4xl md:text-5xl text-blue-900 mb-4 leading-tight">
              {t('company_name', 'عالم النظافة')}
            </h1>
            <p className="text-lg md:text-xl text-blueGray-600 mb-6">
              {t('company_slogan', 'نظافة تليق بثقتكم - أفضل شركة تنظيف في جدة')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link href="#contact"><span className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-8 rounded shadow transition cursor-pointer">{t('contact_us', 'تواصل معنا')}</span></Link>
              <Link href="#services"><span className="bg-white border border-blue-700 text-blue-700 font-bold py-3 px-8 rounded shadow hover:bg-blue-50 transition cursor-pointer">{t('our_services', 'خدماتنا')}</span></Link>
            </div>
          </div>
          <div className="w-full md:w-1/2 px-4 mt-12 md:mt-0 flex justify-center">
            <img
              className={`w-full max-w-lg ${isRTL ? 'scale-x-[-1]' : ''}`}
              style={isRTL ? {transform: 'scaleX(-1)'} : {}}
              src="/img/pattern_nextjs.png"
              alt="pattern"
            />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-blue-900 mb-12">{t('main_services', 'خدماتنا الرئيسية')}</h2>
          <div className="flex flex-wrap justify-center gap-8">
            {/* Example service cards, add more as needed */}
            <div className="bg-blue-50 rounded-lg shadow-lg p-8 w-72 text-center flex flex-col items-center">
              <span className="text-5xl mb-4 text-blue-700"><i className="fas fa-broom"></i></span>
              <h3 className="font-semibold text-xl mb-2">{t('service_home_cleaning', 'تنظيف المنازل')}</h3>
              <p className="text-blueGray-600">{t('service_home_cleaning_desc', 'تنظيف شامل للمنازل والشقق بأحدث المعدات وأفضل المواد.')}</p>
            </div>
            <div className="bg-blue-50 rounded-lg shadow-lg p-8 w-72 text-center flex flex-col items-center">
              <span className="text-5xl mb-4 text-blue-700"><i className="fas fa-building"></i></span>
              <h3 className="font-semibold text-xl mb-2">{t('service_office_cleaning', 'تنظيف المكاتب')}</h3>
              <p className="text-blueGray-600">{t('service_office_cleaning_desc', 'خدمة تنظيف المكاتب والشركات باحترافية وسرعة.')}</p>
            </div>
            <div className="bg-blue-50 rounded-lg shadow-lg p-8 w-72 text-center flex flex-col items-center">
              <span className="text-5xl mb-4 text-blue-700"><i className="fas fa-soap"></i></span>
              <h3 className="font-semibold text-xl mb-2">{t('service_deep_cleaning', 'تنظيف عميق')}</h3>
              <p className="text-blueGray-600">{t('service_deep_cleaning_desc', 'تنظيف عميق للمفروشات والسجاد والكنب والمجالس.')}</p>
            </div>
            <div className="bg-blue-50 rounded-lg shadow-lg p-8 w-72 text-center flex flex-col items-center">
              <span className="text-5xl mb-4 text-blue-700"><i className="fas fa-water"></i></span>
              <h3 className="font-semibold text-xl mb-2">{t('service_water_tank', 'تنظيف خزانات المياه')}</h3>
              <p className="text-blueGray-600">{t('service_water_tank_desc', 'تنظيف وتعقيم خزانات المياه بأمان وكفاءة.')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="py-20 bg-blue-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-blue-900 mb-12">{t('why_us', 'لماذا نحن؟')}</h2>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="bg-white rounded-lg shadow p-8 w-80 text-center flex flex-col items-center">
              <span className="text-4xl mb-4 text-blue-700"><i className="fas fa-user-shield"></i></span>
              <h4 className="font-semibold text-lg mb-2">{t('trusted_team', 'فريق موثوق')}</h4>
              <p className="text-blueGray-600">{t('trusted_team_desc', 'فريق مدرب وذو خبرة يضمن أعلى معايير الجودة والأمان.')}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-8 w-80 text-center flex flex-col items-center">
              <span className="text-4xl mb-4 text-blue-700"><i className="fas fa-award"></i></span>
              <h4 className="font-semibold text-lg mb-2">{t('quality_guarantee', 'ضمان الجودة')}</h4>
              <p className="text-blueGray-600">{t('quality_guarantee_desc', 'ضمان رضا العميل وجودة الخدمة المقدمة.')}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-8 w-80 text-center flex flex-col items-center">
              <span className="text-4xl mb-4 text-blue-700"><i className="fas fa-clock"></i></span>
              <h4 className="font-semibold text-lg mb-2">{t('fast_response', 'استجابة سريعة')}</h4>
              <p className="text-blueGray-600">{t('fast_response_desc', 'خدمة عملاء سريعة ودعم متواصل على مدار الساعة.')}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-8 w-80 text-center flex flex-col items-center">
              <span className="text-4xl mb-4 text-blue-700"><i className="fas fa-hand-holding-usd"></i></span>
              <h4 className="font-semibold text-lg mb-2">{t('competitive_prices', 'أسعار تنافسية')}</h4>
              <p className="text-blueGray-600">{t('competitive_prices_desc', 'أفضل جودة بأفضل سعر في جدة.')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision, Mission, Values Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto flex flex-col md:flex-row gap-12 items-center justify-center">
          <div className="bg-blue-50 rounded-lg shadow-lg p-8 w-full md:w-1/3 text-center">
            <span className="text-4xl mb-4 text-blue-700"><i className="fas fa-eye"></i></span>
            <h4 className="font-bold text-xl mb-2">{t('our_vision', 'رؤيتنا')}</h4>
            <p className="text-blueGray-600">{t('vision_text', 'أن نكون الخيار الأول في خدمات التنظيف بجدة من خلال الجودة والابتكار.')}</p>
          </div>
          <div className="bg-blue-50 rounded-lg shadow-lg p-8 w-full md:w-1/3 text-center">
            <span className="text-4xl mb-4 text-blue-700"><i className="fas fa-bullseye"></i></span>
            <h4 className="font-bold text-xl mb-2">{t('our_mission', 'رسالتنا')}</h4>
            <p className="text-blueGray-600">{t('mission_text', 'تقديم خدمات تنظيف بمعايير عالمية تلبي تطلعات عملائنا وتفوق توقعاتهم.')}</p>
          </div>
          <div className="bg-blue-50 rounded-lg shadow-lg p-8 w-full md:w-1/3 text-center">
            <span className="text-4xl mb-4 text-blue-700"><i className="fas fa-heart"></i></span>
            <h4 className="font-bold text-xl mb-2">{t('our_values', 'قيمنا')}</h4>
            <p className="text-blueGray-600">{t('values_text', 'الالتزام، الأمانة، الجودة، الابتكار، رضا العميل.')}</p>
          </div>
        </div>
      </section>

      {/* Offers Section */}
      <section className="py-20 bg-blue-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-blue-900 mb-12">{t('special_offers', 'عروضنا الخاصة')}</h2>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="bg-white rounded-lg shadow-lg p-8 w-80 text-center flex flex-col items-center border-2 border-blue-200">
              <h3 className="font-bold text-2xl mb-2 text-blue-700">{t('offer_1_title', 'خصم 20% على تنظيف المنازل')}</h3>
              <p className="text-blueGray-600 mb-4">{t('offer_1_desc', 'احجز الآن واستفد من العرض لفترة محدودة!')}</p>
              <Link href="#contact"><span className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-6 rounded shadow transition cursor-pointer">{t('book_now', 'احجز الآن')}</span></Link>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-8 w-80 text-center flex flex-col items-center border-2 border-blue-200">
              <h3 className="font-bold text-2xl mb-2 text-blue-700">{t('offer_2_title', 'تنظيف خزانات المياه بسعر خاص')}</h3>
              <p className="text-blueGray-600 mb-4">{t('offer_2_desc', 'اتصل بنا لمعرفة التفاصيل والحصول على أفضل سعر!')}</p>
              <Link href="#contact"><span className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-6 rounded shadow transition cursor-pointer">{t('contact_us', 'تواصل معنا')}</span></Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-blue-900 mb-12">{t('testimonials', 'آراء عملائنا')}</h2>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="bg-blue-50 rounded-lg shadow p-8 w-80 text-center flex flex-col items-center">
              <img src="/img/team-1-800x800.jpg" alt="client1" className="w-20 h-20 rounded-full mb-4" />
              <p className="text-blueGray-600 mb-2">{t('testimonial_1', 'خدمة ممتازة وسرعة في الاستجابة. أنصح الجميع!')}</p>
              <span className="font-bold text-blue-700">{t('client_1', 'محمد - جدة')}</span>
            </div>
            <div className="bg-blue-50 rounded-lg shadow p-8 w-80 text-center flex flex-col items-center">
              <img src="/img/team-2-800x800.jpg" alt="client2" className="w-20 h-20 rounded-full mb-4" />
              <p className="text-blueGray-600 mb-2">{t('testimonial_2', 'أفضل شركة تنظيف تعاملت معها. جودة عالية وأسعار مناسبة.')}</p>
              <span className="font-bold text-blue-700">{t('client_2', 'سارة - جدة')}</span>
            </div>
            <div className="bg-blue-50 rounded-lg shadow p-8 w-80 text-center flex flex-col items-center">
              <img src="/img/team-3-800x800.jpg" alt="client3" className="w-20 h-20 rounded-full mb-4" />
              <p className="text-blueGray-600 mb-2">{t('testimonial_3', 'التزام بالمواعيد ونتائج رائعة. شكراً لكم!')}</p>
              <span className="font-bold text-blue-700">{t('client_3', 'أحمد - جدة')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-blue-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-blue-900 mb-12">{t('contact_us', 'تواصل معنا')}</h2>
          <div className="flex flex-col md:flex-row gap-12 items-center justify-center">
            <div className="w-full md:w-1/2 bg-white rounded-lg shadow-lg p-8">
              <h4 className="font-semibold text-xl mb-4 text-blue-700">{t('contact_info', 'معلومات التواصل')}</h4>
              <ul className="text-blueGray-600 space-y-2">
                <li><i className="fas fa-phone-alt text-blue-700 mr-2"></i> {t('phone', '0500000000')}</li>
                <li><i className="fas fa-envelope text-blue-700 mr-2"></i> {t('email', 'info@m-clean.net')}</li>
                <li><i className="fas fa-map-marker-alt text-blue-700 mr-2"></i> {t('address', 'جدة، المملكة العربية السعودية')}</li>
              </ul>
            </div>
            <div className="w-full md:w-1/2 bg-white rounded-lg shadow-lg p-8">
              <h4 className="font-semibold text-xl mb-4 text-blue-700">{t('contact_form', 'نموذج التواصل السريع')}</h4>
              <form className="space-y-4">
                <input type="text" placeholder={t('your_name', 'اسمك')} className="w-full border border-blue-200 rounded px-4 py-3 focus:outline-none focus:border-blue-400" />
                <input type="email" placeholder={t('your_email', 'بريدك الإلكتروني')} className="w-full border border-blue-200 rounded px-4 py-3 focus:outline-none focus:border-blue-400" />
                <textarea placeholder={t('your_message', 'رسالتك')} className="w-full border border-blue-200 rounded px-4 py-3 focus:outline-none focus:border-blue-400" rows={4}></textarea>
                <button type="submit" className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-8 rounded shadow transition w-full">{t('send_message', 'إرسال')}</button>
              </form>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
