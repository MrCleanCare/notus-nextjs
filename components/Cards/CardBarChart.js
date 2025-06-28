import React from "react";
import * as Chart from "chart.js";
import { useTranslation } from "react-i18next";

Chart.Chart.register(Chart.BarController, Chart.BarElement, Chart.CategoryScale, Chart.LinearScale, Chart.Title, Chart.Tooltip, Chart.Legend);

export default function CardBarChart() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n?.language === 'ar';
  React.useEffect(() => {
    let config = {
      type: "bar",
      data: {
        labels: t('months', { returnObjects: true }),
        datasets: [
          {
            label: new Date().getFullYear(),
            backgroundColor: "#ed64a6",
            borderColor: "#ed64a6",
            data: [30, 78, 56, 34, 100, 45, 13],
            fill: false,
            barThickness: 8,
          },
          {
            label: new Date().getFullYear() - 1,
            fill: false,
            backgroundColor: "#4c51bf",
            borderColor: "#4c51bf",
            data: [27, 68, 86, 74, 10, 4, 87],
            barThickness: 8,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
          legend: {
            labels: {
              color: "rgba(0,0,0,.4)",
            },
            align: "end",
            position: "bottom",
          },
          tooltip: {
            mode: "index",
            intersect: false,
          },
        },
        hover: {
          mode: "nearest",
          intersect: true,
        },
        scales: {
          x: {
            display: false,
            grid: {
              borderDash: [2],
              borderDashOffset: [2],
              color: "rgba(33, 37, 41, 0.3)",
              zeroLineColor: "rgba(33, 37, 41, 0.3)",
              zeroLineBorderDash: [2],
              zeroLineBorderDashOffset: [2],
            },
          },
          y: {
            display: true,
            grid: {
              borderDash: [2],
              drawBorder: false,
              borderDashOffset: [2],
              color: "rgba(33, 37, 41, 0.2)",
              zeroLineColor: "rgba(33, 37, 41, 0.15)",
              zeroLineBorderDash: [2],
              zeroLineBorderDashOffset: [2],
            },
          },
        },
      },
    };
    let ctx = document.getElementById("bar-chart").getContext("2d");
    window.myBar = new Chart.Chart(ctx, config);
  }, [t]);
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-xl drop-shadow-md transition-all duration-300"
        style={{ fontFamily: isRTL ? 'Cairo, sans-serif' : 'Segoe UI, sans-serif', direction: isRTL ? 'rtl' : 'ltr' }}>
        <div className="rounded-t mb-0 px-4 py-3 border-0 bg-gradient-to-r from-teal-50 to-blueGray-100 dark:from-blueGray-900 dark:to-blueGray-800">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className="font-extrabold text-base md:text-lg text-teal-700 dark:text-teal-300 drop-shadow-sm transition-colors duration-200">
                {t('bar_chart')}
              </h3>
            </div>
          </div>
        </div>
        <div className="p-4 flex-auto">
          {/* Chart */}
          <div className="relative h-350-px">
            <canvas id="bar-chart"></canvas>
          </div>
        </div>
      </div>
    </>
  );
}
