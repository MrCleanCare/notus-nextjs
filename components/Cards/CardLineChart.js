import React from "react";
import * as Chart from "chart.js";
import { useTranslation } from "react-i18next";

Chart.Chart.register(
  Chart.LineController,
  Chart.LineElement,
  Chart.PointElement,
  Chart.CategoryScale,
  Chart.LinearScale,
  Chart.Title,
  Chart.Tooltip,
  Chart.Legend
);

export default function CardLineChart() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n?.language === "ar";
  React.useEffect(() => {
    var config = {
      type: "line",
      data: {
        labels: t("months", { returnObjects: true }),
        datasets: [
          {
            label: new Date().getFullYear(),
            backgroundColor: "#4c51bf",
            borderColor: "#4c51bf",
            data: [65, 78, 66, 44, 56, 67, 75],
            fill: false,
          },
          {
            label: new Date().getFullYear() - 1,
            fill: false,
            backgroundColor: "#fff",
            borderColor: "#fff",
            data: [40, 68, 86, 74, 56, 60, 87],
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        title: {
          display: false,
          text: "Sales Charts",
          fontColor: "white",
        },
        legend: {
          labels: {
            fontColor: "white",
          },
          align: "end",
          position: "bottom",
        },
        tooltips: {
          mode: "index",
          intersect: false,
        },
        hover: {
          mode: "nearest",
          intersect: true,
        },
        scales: {
          xAxes: [
            {
              ticks: {
                fontColor: "rgba(255,255,255,.7)",
              },
              display: true,
              scaleLabel: {
                display: false,
                labelString: "Month",
                fontColor: "white",
              },
              gridLines: {
                display: false,
                borderDash: [2],
                borderDashOffset: [2],
                color: "rgba(33, 37, 41, 0.3)",
                zeroLineColor: "rgba(0, 0, 0, 0)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                fontColor: "rgba(255,255,255,.7)",
              },
              display: true,
              scaleLabel: {
                display: false,
                labelString: "Value",
                fontColor: "white",
              },
              gridLines: {
                borderDash: [3],
                borderDashOffset: [3],
                drawBorder: false,
                color: "rgba(255, 255, 255, 0.15)",
                zeroLineColor: "rgba(33, 37, 41, 0)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
        },
      },
    };
    var ctx = document.getElementById("line-chart").getContext("2d");
    window.myLine = new Chart.Chart(ctx, config);
  }, [t]);
  return (
    <>
      <div
        className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-xl drop-shadow-md transition-all duration-300"
        style={{
          fontFamily: isRTL ? "Cairo, sans-serif" : "Segoe UI, sans-serif",
          direction: isRTL ? "rtl" : "ltr",
        }}
      >
        <div className="rounded-t mb-0 px-4 py-3 border-0 bg-gradient-to-r from-teal-50 to-blueGray-100 dark:from-blueGray-900 dark:to-blueGray-800">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className="font-extrabold text-base md:text-lg text-teal-700 dark:text-teal-300 drop-shadow-sm transition-colors duration-200">
                {t("line_chart")}
              </h3>
            </div>
          </div>
        </div>
        <div className="p-4 flex-auto">
          {/* Chart */}
          <div className="relative h-350-px">
            <canvas id="line-chart"></canvas>
          </div>
        </div>
      </div>
    </>
  );
}
