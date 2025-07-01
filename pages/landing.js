import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import nextI18NextConfig from '../next-i18next.config';

// components

import Navbar from "components/Navbars/AuthNavbar.js";
import Footer from "components/Footers/Footer.js";

const galleryImages = [
  { src: "/img/landing.jpg", alt: "نموذج تنظيف", caption: "تنظيف منزل فاخر" },
  { src: "/img/team-2-800x800.jpg", alt: "نموذج فريق", caption: "فريق العمل أثناء الخدمة" },
  { src: "/img/component-profile-card.png", alt: "نموذج خدمة", caption: "تنظيف سجاد وكنب" },
  { src: "/img/component-info-card.png", alt: "نموذج تنظيف", caption: "تعقيم الأسطح" },
  { src: "/img/team-4-470x470.png", alt: "نموذج فريق", caption: "تدريب الطاقم" },
  { src: "/img/cleaning_world_logo_transparent.png", alt: "شعار الشركة", caption: "شعار عالم النظافة" },
];

const faqs = [
  {
    q: "ما هي المناطق التي تغطونها؟",
    a: "نخدم مدينة جدة والمناطق المجاورة."
  },
  {
    q: "هل المواد المستخدمة آمنة؟",
    a: "نستخدم مواد تنظيف آمنة وصديقة للبيئة."
  },
  {
    q: "كيف يمكنني الحجز؟",
    a: "يمكنك الحجز عبر الموقع أو التواصل معنا مباشرة عبر الهاتف أو واتساب."
  },
  {
    q: "هل تقدمون عروض خاصة؟",
    a: "نعم، تابعنا على وسائل التواصل أو تواصل معنا لمعرفة العروض الحالية."
  },
];

const stats = [
  { icon: "fa-users", label: "عملاء سعداء", value: "+1500" },
  { icon: "fa-calendar-check", label: "سنوات الخبرة", value: "10" },
  { icon: "fa-broom", label: "خدمات منفذة", value: "+5000" },
  { icon: "fa-star", label: "تقييم العملاء", value: "4.9/5" },
];

const packages = [
  {
    title: "باقة المنازل",
    price: "299 ريال",
    features: ["تنظيف شامل", "تعقيم الأسطح", "تنظيف سجاد وكنب", "خدمة في نفس اليوم"],
  },
  {
    title: "باقة المكاتب",
    price: "499 ريال",
    features: ["تنظيف مكاتب", "تعقيم أجهزة", "خدمة دورية", "دعم فني مستمر"],
  },
  {
    title: "باقة التعقيم",
    price: "199 ريال",
    features: ["تعقيم شامل", "مواد آمنة", "نتائج فورية", "ضمان رضا العميل"],
  },
];

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'], nextI18NextConfig)),
    },
  };
}

export default function Landing() {
  const { t } = useTranslation('common');
  const [isRTL, setIsRTL] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsRTL(document.documentElement.dir === 'rtl');
    }
  }, []);

  return (
    <div style={{ fontFamily: isRTL ? 'Cairo, sans-serif' : 'Inter, Segoe UI, Arial, sans-serif', direction: isRTL ? 'rtl' : 'ltr', fontSize: '1.1rem', background: '#f8fafc' }}>
      {/* Top Contact Bar */}
      <div className="w-full bg-blue-700 text-white text-center py-2 px-4 text-sm font-semibold tracking-wide flex items-center justify-center gap-2">
        <i className="fa-solid fa-phone-volume mr-2"></i>
        <span>للتواصل: 0500000000</span>
      </div>
      <Navbar transparent={false} />
      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/966500000000"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="تواصل واتساب"
        className="fixed z-50 bottom-6 left-6 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg p-4 flex items-center justify-center transition-all duration-200 animate-bounce"
      >
        <i className="fab fa-whatsapp fa-2x"></i>
      </a>
      {/* Hero Section */}
      <section className="relative pt-24 flex items-center min-h-[70vh] bg-gradient-to-br from-blue-100 to-blue-50">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="w-full md:w-1/2 px-4 text-center md:text-start flex flex-col items-center md:items-start">
            <img src="/img/cleaning_world_logo_transparent.png" alt="Cleaning World Logo" className="w-40 mb-6 drop-shadow-xl" />
            <h1 className="font-extrabold text-4xl md:text-5xl text-blue-900 mb-4 leading-tight">
              نظافة تليق بثقتكم
            </h1>
            <p className="text-lg md:text-xl text-blueGray-600 mb-6">
              خدمات تنظيف متكاملة للمنازل والمكاتب والشركات في جدة وما حولها.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link href="#contact"><span className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-8 rounded shadow transition cursor-pointer">تواصل معنا</span></Link>
              <Link href="#services"><span className="bg-white border border-blue-700 text-blue-700 font-bold py-3 px-8 rounded shadow hover:bg-blue-50 transition cursor-pointer">خدماتنا</span></Link>
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

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto flex flex-wrap justify-center gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center bg-blue-50 rounded-xl shadow p-6 w-48">
              <span className="text-4xl text-blue-700 mb-2"><i className={`fa-solid ${stat.icon}`}></i></span>
              <span className="text-3xl font-extrabold text-blue-900 mb-1">{stat.value}</span>
              <span className="text-blueGray-600 text-lg font-semibold">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-blue-900 mb-12">خدماتنا الرئيسية</h2>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="bg-blue-50 rounded-lg shadow-lg p-8 w-72 text-center flex flex-col items-center">
              <span className="text-5xl mb-4 text-blue-700"><i className="fas fa-broom"></i></span>
              <h3 className="font-semibold text-xl mb-2">تنظيف المنازل</h3>
              <p className="text-blueGray-600">تنظيف شامل للمنازل والشقق بأحدث المعدات وأفضل المواد.</p>
            </div>
            <div className="bg-blue-50 rounded-lg shadow-lg p-8 w-72 text-center flex flex-col items-center">
              <span className="text-5xl mb-4 text-blue-700"><i className="fas fa-building"></i></span>
              <h3 className="font-semibold text-xl mb-2">تنظيف المكاتب</h3>
              <p className="text-blueGray-600">خدمة تنظيف المكاتب والشركات باحترافية وسرعة.</p>
            </div>
            <div className="bg-blue-50 rounded-lg shadow-lg p-8 w-72 text-center flex flex-col items-center">
              <span className="text-5xl mb-4 text-blue-700"><i className="fas fa-soap"></i></span>
              <h3 className="font-semibold text-xl mb-2">تنظيف عميق</h3>
              <p className="text-blueGray-600">تنظيف عميق للمفروشات والسجاد والكنب والمجالس.</p>
            </div>
            <div className="bg-blue-50 rounded-lg shadow-lg p-8 w-72 text-center flex flex-col items-center">
              <span className="text-5xl mb-4 text-blue-700"><i className="fas fa-water"></i></span>
              <h3 className="font-semibold text-xl mb-2">تنظيف خزانات المياه</h3>
              <p className="text-blueGray-600">تنظيف وتعقيم خزانات المياه بأمان وكفاءة.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 bg-blue-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-blue-900 mb-12">معرض الصور</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
            {galleryImages.map((img, i) => (
              <div key={i} className="flex flex-col items-center">
                <img src={img.src} alt={img.alt} className="rounded-lg shadow-md object-cover w-full h-40 hover:scale-105 transition" />
                <span className="mt-2 text-blueGray-600 text-sm text-center">{img.caption}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-blue-900 mb-12">لماذا نحن؟</h2>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="bg-blue-50 rounded-lg shadow p-8 w-80 text-center flex flex-col items-center">
              <span className="text-4xl mb-4 text-blue-700"><i className="fas fa-user-shield"></i></span>
              <h4 className="font-semibold text-lg mb-2">فريق موثوق</h4>
              <p className="text-blueGray-600">فريق مدرب وذو خبرة يضمن أعلى معايير الجودة والأمان.</p>
            </div>
            <div className="bg-blue-50 rounded-lg shadow p-8 w-80 text-center flex flex-col items-center">
              <span className="text-4xl mb-4 text-blue-700"><i className="fas fa-award"></i></span>
              <h4 className="font-semibold text-lg mb-2">ضمان الجودة</h4>
              <p className="text-blueGray-600">ضمان رضا العميل وجودة الخدمة المقدمة.</p>
            </div>
            <div className="bg-blue-50 rounded-lg shadow p-8 w-80 text-center flex flex-col items-center">
              <span className="text-4xl mb-4 text-blue-700"><i className="fas fa-clock"></i></span>
              <h4 className="font-semibold text-lg mb-2">استجابة سريعة</h4>
              <p className="text-blueGray-600">خدمة عملاء سريعة ودعم متواصل على مدار الساعة.</p>
            </div>
            <div className="bg-blue-50 rounded-lg shadow p-8 w-80 text-center flex flex-col items-center">
              <span className="text-4xl mb-4 text-blue-700"><i className="fas fa-hand-holding-usd"></i></span>
              <h4 className="font-semibold text-lg mb-2">أسعار تنافسية</h4>
              <p className="text-blueGray-600">أفضل جودة بأفضل سعر في جدة.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-20 bg-blue-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-blue-900 mb-12">الباقات والأسعار</h2>
          <div className="flex flex-wrap justify-center gap-8">
            {packages.map((pkg, i) => (
              <div key={i} className="bg-white rounded-xl shadow-lg p-8 w-80 flex flex-col items-center border-2 border-blue-100">
                <h3 className="font-bold text-2xl mb-2 text-blue-700">{pkg.title}</h3>
                <span className="text-3xl font-extrabold text-blue-900 mb-4">{pkg.price}</span>
                <ul className="mb-4 space-y-2">
                  {pkg.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-blueGray-600"><i className="fa-solid fa-check-circle text-green-400"></i>{f}</li>
                  ))}
                </ul>
                <button className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-6 rounded shadow transition cursor-pointer">احجز الآن</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners/Clients Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold text-center text-blue-900 mb-8">شركاؤنا</h2>
          <div className="flex flex-wrap justify-center items-center gap-8">
            <img src="/img/angular.jpg" alt="Angular" className="h-16 w-auto grayscale opacity-70 hover:opacity-100 transition" />
            <img src="/img/react.jpg" alt="React" className="h-16 w-auto grayscale opacity-70 hover:opacity-100 transition" />
            <img src="/img/vue.jpg" alt="Vue" className="h-16 w-auto grayscale opacity-70 hover:opacity-100 transition" />
            <img src="/img/bootstrap.jpg" alt="Bootstrap" className="h-16 w-auto grayscale opacity-70 hover:opacity-100 transition" />
            <img src="/img/sketch.jpg" alt="Sketch" className="h-16 w-auto grayscale opacity-70 hover:opacity-100 transition" />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-blue-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-blue-900 mb-12">آراء العملاء</h2>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="bg-white rounded-lg shadow-lg p-8 w-96 text-center flex flex-col items-center">
              <img src="/img/profile.jpg" alt="عميل" className="w-16 h-16 rounded-full mb-4 shadow" />
              <p className="text-blueGray-700 italic mb-2">"خدمة ممتازة وسرعة في التنفيذ. أنصح الجميع بالتعامل معهم!"</p>
              <span className="font-bold text-blue-700">محمد - جدة</span>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-8 w-96 text-center flex flex-col items-center">
              <img src="/img/team-1-800x800.jpg" alt="عميلة" className="w-16 h-16 rounded-full mb-4 shadow" />
              <p className="text-blueGray-700 italic mb-2">"أفضل شركة تنظيف جربتها، فريق محترف ونتائج رائعة."</p>
              <span className="font-bold text-blue-700">سارة - جدة</span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section (Accordion) */}
      <section className="py-20 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-blue-900 mb-12">الأسئلة الشائعة</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-blue-50 rounded-lg shadow p-4">
                <button
                  className="flex items-center justify-between w-full text-lg font-semibold text-blue-900 focus:outline-none"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                  aria-controls={`faq-content-${i}`}
                >
                  <span className="flex items-center gap-2"><i className="fa-solid fa-question-circle text-blue-400"></i>{faq.q}</span>
                  <i className={`fa-solid transition-transform duration-200 ${openFaq === i ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
                </button>
                <div
                  id={`faq-content-${i}`}
                  className={`overflow-hidden transition-all duration-300 ${openFaq === i ? 'max-h-40 mt-2' : 'max-h-0'}`}
                  aria-hidden={openFaq !== i}
                >
                  <p className="text-blueGray-700 text-base py-2">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-12 bg-gradient-to-r from-blue-700 to-blue-400">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-0">جاهز لتنظيف بيتك أو مكتبك؟ احجز الآن واستمتع بعالم من النظافة!</h2>
          <Link href="#contact"><span className="bg-white text-blue-700 font-bold py-3 px-8 rounded shadow hover:bg-blue-50 transition cursor-pointer">تواصل معنا الآن</span></Link>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-blue-900 mb-12">تواصل معنا</h2>
          <div className="flex flex-col md:flex-row gap-12 items-center justify-center">
            <div className="w-full md:w-1/2 bg-blue-50 rounded-lg shadow-lg p-8">
              <h4 className="font-semibold text-xl mb-4 text-blue-700">معلومات التواصل</h4>
              <ul className="text-blueGray-600 space-y-2">
                <li><i className="fas fa-phone-alt text-blue-700 mr-2"></i> 0500000000</li>
                <li><i className="fas fa-envelope text-blue-700 mr-2"></i> info@m-clean.net</li>
                <li><i className="fas fa-map-marker-alt text-blue-700 mr-2"></i> جدة، المملكة العربية السعودية</li>
              </ul>
              {/* Google Maps Embed */}
              <div className="mt-6 rounded-lg overflow-hidden shadow-lg border border-blue-100">
                <iframe
                  title="خريطة الموقع"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3624.9999999999995!2d39.197971!3d21.485811!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15c3d2e6e6e6e6e6%3A0x6e6e6e6e6e6e6e6e!2z2YXYr9mK2YUg2KfZhNin2YTZhNmK2Kk!5e0!3m2!1sar!2ssa!4v1680000000000!5m2!1sar!2ssa"
                  width="100%"
                  height="220"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
            <div className="w-full md:w-1/2 bg-blue-50 rounded-lg shadow-lg p-8">
              <h4 className="font-semibold text-xl mb-4 text-blue-700">نموذج التواصل السريع</h4>
              <form className="space-y-4">
                <input type="text" placeholder="اسمك" className="w-full border border-blue-200 rounded px-4 py-3 focus:outline-none focus:border-blue-400" />
                <input type="email" placeholder="بريدك الإلكتروني" className="w-full border border-blue-200 rounded px-4 py-3 focus:outline-none focus:border-blue-400" />
                <textarea placeholder="رسالتك" className="w-full border border-blue-200 rounded px-4 py-3 focus:outline-none focus:border-blue-400" rows={4}></textarea>
                <button type="submit" className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-8 rounded shadow transition w-full">إرسال</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Process Steps Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-blue-900 mb-12">كيف نعمل؟</h2>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="flex flex-col items-center w-48">
              <span className="bg-blue-100 text-blue-700 rounded-full p-4 mb-4 text-3xl"><i className="fa-solid fa-phone-volume"></i></span>
              <h4 className="font-semibold text-lg mb-2">تواصل معنا</h4>
              <p className="text-blueGray-600 text-center text-sm">اتصل أو احجز عبر الموقع.</p>
            </div>
            <div className="flex flex-col items-center w-48">
              <span className="bg-blue-100 text-blue-700 rounded-full p-4 mb-4 text-3xl"><i className="fa-solid fa-calendar-check"></i></span>
              <h4 className="font-semibold text-lg mb-2">تأكيد الموعد</h4>
              <p className="text-blueGray-600 text-center text-sm">نحدد الوقت المناسب لك.</p>
            </div>
            <div className="flex flex-col items-center w-48">
              <span className="bg-blue-100 text-blue-700 rounded-full p-4 mb-4 text-3xl"><i className="fa-solid fa-broom"></i></span>
              <h4 className="font-semibold text-lg mb-2">تنفيذ الخدمة</h4>
              <p className="text-blueGray-600 text-center text-sm">فريقنا ينفذ الخدمة باحترافية.</p>
            </div>
            <div className="flex flex-col items-center w-48">
              <span className="bg-blue-100 text-blue-700 rounded-full p-4 mb-4 text-3xl"><i className="fa-solid fa-face-smile"></i></span>
              <h4 className="font-semibold text-lg mb-2">رضاك يهمنا</h4>
              <p className="text-blueGray-600 text-center text-sm">نضمن رضاك الكامل.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Carousel Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-blue-900 mb-12">ماذا يقول عملاؤنا؟</h2>
          <div className="relative max-w-2xl mx-auto">
            <TestimonialsCarousel />
          </div>
        </div>
      </section>

      {/* Newsletter Signup Section */}
      <section className="py-12 bg-blue-50">
        <div className="container mx-auto flex flex-col items-center">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-4">اشترك في النشرة البريدية</h2>
          <p className="text-blueGray-600 mb-6 text-center">كن أول من يعرف عن العروض والخدمات الجديدة.</p>
          <form className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
            <input type="email" placeholder="بريدك الإلكتروني" className="flex-1 border border-blue-200 rounded px-4 py-3 focus:outline-none focus:border-blue-400" />
            <button type="submit" className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-8 rounded shadow transition">اشترك</button>
          </form>
        </div>
      </section>

      {/* Team Section */}
      {/* Blog Preview Section */}

      <Footer />
    </div>
  );
}

function TestimonialsCarousel() {
  const testimonials = [
    {
      img: "/img/profile.jpg",
      name: "محمد - جدة",
      text: "خدمة ممتازة وسرعة في التنفيذ. أنصح الجميع بالتعامل معهم!"
    },
    {
      img: "/img/team-1-800x800.jpg",
      name: "سارة - جدة",
      text: "أفضل شركة تنظيف جربتها، فريق محترف ونتائج رائعة."
    },
    {
      img: "/img/team-2-800x800.jpg",
      name: "خالد - جدة",
      text: "تعامل راقي ونتائج فوق المتوقع."
    },
  ];
  const [index, setIndex] = React.useState(0);
  React.useEffect(() => {
    const timer = setInterval(() => setIndex(i => (i + 1) % testimonials.length), 4000);
    return () => clearInterval(timer);
  }, [testimonials.length]);
  return (
    <div className="relative bg-blue-50 rounded-lg shadow-lg p-8 text-center flex flex-col items-center min-h-[260px]">
      <img src={testimonials[index].img} alt={testimonials[index].name} className="w-16 h-16 rounded-full mb-4 shadow" />
      <p className="text-blueGray-700 italic mb-2">"{testimonials[index].text}"</p>
      <span className="font-bold text-blue-700">{testimonials[index].name}</span>
      <div className="flex gap-2 justify-center mt-4">
        {testimonials.map((_, i) => (
          <button key={i} onClick={() => setIndex(i)} className={`w-3 h-3 rounded-full ${i === index ? 'bg-blue-700' : 'bg-blue-200'}`}></button>
        ))}
      </div>
    </div>
  );
}

