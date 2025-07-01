import React from "react";
import { useTranslation } from 'next-i18next';

function MapExample() {
  // إحداثيات الموقع (حي الفيصلية - طريق الأمير محمد بن عبدالعزيز)
  const lat = 21.559527;
  const lng = 39.184956;
  const mapSrc = `https://www.google.com/maps?q=${lat},${lng}&hl=ar&z=16&output=embed`;
  const mapsUrl = `https://maps.google.com/?q=${lat},${lng}`;
  // تحديد اتجاه البطاقة حسب اللغة
  const isRTL = typeof window !== 'undefined' ? document.dir === 'rtl' : true;
  const { t, i18n } = useTranslation('common');

  const debugT = (key, fallback = '') => {
    const value = t(key, fallback);
    if (value === key || value === '' || value === undefined) {
      return `[${i18n.language}]::${key}`;
    }
    return value;
  };

  return (
    <div className="relative w-full rounded-lg overflow-hidden shadow-md border border-teal-100 dark:border-teal-700 min-h-[420px]">
      {/* بطاقة معلومات الموقع مصغرة في الزاوية */}
      <div
        className={`absolute top-4 ${isRTL ? 'right-4' : 'left-4'} z-30 bg-white dark:bg-blueGray-900 rounded-lg shadow-lg px-4 py-3 text-right font-cairo min-w-[220px] max-w-[90vw] border-t-4 border-teal-500 flex flex-col items-center gap-1`}
        dir="rtl"
        style={{zIndex: 30, width: 270, maxWidth: '95vw'}}
      >
        {/* الشعار واسم الشركة */}
        <img
          src="/img/cleaning_world_logo_transparent.png"
          alt={debugT('map.logo_alt')}
          className="w-16 h-12 object-contain mb-1"
        />
        <h2 className="text-base font-extrabold text-teal-700 dark:text-teal-300 mb-0 leading-tight">
          {debugT('map.company_name')}
        </h2>
        <span className="text-xs text-blueGray-500 dark:text-blueGray-200 mb-1">
          {debugT('map.company_name_en')}
        </span>
        {/* بيانات العنوان */}
        <div className="text-xs text-blueGray-700 dark:text-blueGray-100 font-bold mb-1 leading-tight">
          {debugT('map.address_line_1')}<br />{debugT('map.address_line_2')}<br />{lat} , {lng}
        </div>
        {/* بيانات التواصل */}
        <div className="flex flex-col gap-0.5 mb-1 w-full items-start">
          <div className="flex flex-row items-center gap-1 text-xs text-blueGray-700 dark:text-blueGray-100">
            <i className="fas fa-phone-alt text-teal-500"></i>
            <span>{debugT('map.phone')}</span>
          </div>
          <div className="flex flex-row items-center gap-1 text-xs text-blueGray-700 dark:text-blueGray-100">
            <i className="fab fa-whatsapp text-green-500"></i>
            <span>{debugT('map.whatsapp')}</span>
          </div>
          <div className="flex flex-row items-center gap-1 text-xs text-blueGray-700 dark:text-blueGray-100">
            <i className="fas fa-envelope text-teal-500"></i>
            <span>{debugT('map.email')}</span>
          </div>
        </div>
        {/* زر فتح الموقع في Google Maps */}
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 px-2 py-1 bg-teal-500 hover:bg-teal-600 text-white rounded font-bold text-xs shadow transition-colors duration-150 mt-1"
        >
          <i className="fas fa-map-marker-alt"></i>
          {debugT('map.google_map_btn')}
        </a>
      </div>
      <iframe
        title={debugT('map.iframe_title')}
        src={mapSrc}
        width="100%"
        height="400"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="w-full h-96 min-h-[350px]"
      ></iframe>
    </div>
  );
}

export default MapExample;
