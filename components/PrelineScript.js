import { useEffect } from "react";
import Router from "next/router";
import $ from "jquery";
import _ from "lodash";
import noUiSlider from "nouislider";
import "datatables.net";
import "dropzone";
import * as VanillaCalendarPro from "vanilla-calendar-pro";

if (typeof window !== "undefined") {
  window._ = _;
  window.$ = $;
  window.jQuery = $;
  window.DataTable = $.fn.dataTable;
  window.noUiSlider = noUiSlider;
  window.VanillaCalendarPro = VanillaCalendarPro;
}

export default function PrelineScript() {
  useEffect(() => {
    let prelineLoaded = false;
    const loadPreline = async () => {
      if (!prelineLoaded) {
        await import("preline/dist/index.js");
        prelineLoaded = true;
      }
    };
    loadPreline();
    const handleRouteChange = () => {
      setTimeout(() => {
        if (
          window.HSStaticMethods &&
          typeof window.HSStaticMethods.autoInit === "function"
        ) {
          window.HSStaticMethods.autoInit();
        }
      }, 100);
    };
    Router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      Router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, []);
  return null;
} 