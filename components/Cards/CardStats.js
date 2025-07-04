import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from 'next-i18next';

export default function CardStats({
  statSubtitle,
  statTitle,
  statArrow,
  statPercent,
  statPercentColor,
  statDescripiron,
  statIconName,
  statIconColor,
}) {
  const { t, i18n } = useTranslation('common');
  const isRTL = i18n.language === 'ar';

  const debugT = (key, fallback = '') => {
    const value = t(key, fallback);
    if (value === key || value === '' || value === undefined) {
      return `[${i18n.language}]::${key}`;
    }
    return value;
  };

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white rounded-xl mb-6 xl:mb-0 shadow-lg drop-shadow-md transition-all duration-300"
        style={{ fontFamily: isRTL ? 'Cairo, sans-serif' : 'Segoe UI, sans-serif', direction: isRTL ? 'rtl' : 'ltr' }}>
        <div className="flex-auto p-4">
          <div className="flex flex-wrap">
            <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
              <h5 className="text-teal-400 uppercase font-bold text-xs md:text-sm transition-colors duration-200">
                {debugT(`cardStats.${statSubtitle}`)}
              </h5>
              <span className="font-extrabold text-xl md:text-2xl text-teal-700 dark:text-teal-300 drop-shadow-sm transition-colors duration-200">
                {statTitle}
              </span>
            </div>
            <div className="relative w-auto pl-4 flex-initial">
              <div
                className={
                  "text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full " +
                  statIconColor
                }
              >
                <i className={statIconName}></i>
              </div>
            </div>
          </div>
          <p className="text-sm text-blueGray-400 mt-4">
            <span className={statPercentColor + " mr-2"}>
              <i
                className={
                  statArrow === "up"
                    ? "fas fa-arrow-up"
                    : statArrow === "down"
                    ? "fas fa-arrow-down"
                    : ""
                }
              ></i>{" "}
              {statPercent}%
            </span>
            <span className="whitespace-nowrap">{debugT(`cardStats.${statDescripiron}`)}</span>
          </p>
        </div>
      </div>
    </>
  );
}

CardStats.defaultProps = {
  statSubtitle: 'traffic',
  statTitle: "350,897",
  statArrow: "up",
  statPercent: "3.48",
  statPercentColor: "text-emerald-500",
  statDescripiron: 'since_last_month',
  statIconName: "far fa-chart-bar",
  statIconColor: "bg-red-500",
};

CardStats.propTypes = {
  statSubtitle: PropTypes.string,
  statTitle: PropTypes.string,
  statArrow: PropTypes.oneOf(["up", "down"]),
  statPercent: PropTypes.string,
  // can be any of the text color utilities
  // from tailwindcss
  statPercentColor: PropTypes.string,
  statDescripiron: PropTypes.string,
  statIconName: PropTypes.string,
  // can be any of the background color utilities
  // from tailwindcss
  statIconColor: PropTypes.string,
  // statSubtitle, statTitle, statDescripiron يجب أن تكون مفاتيح ترجمة أو نصوص مترجمة مسبقًا
};
