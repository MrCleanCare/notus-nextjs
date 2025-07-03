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
    // Prevent Preline from interfering with Popper.js dropdowns and resize events
    // by overriding any global resize handlers that Preline might have attached

    let resizeTimeout;

    const handleResize = () => {
      // Debounce resize events to prevent conflicts
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        // Only handle resize for non-Preline elements
        try {
          // Ensure dropdowns and other components handle their own resize logic
          const dropdowns = document.querySelectorAll(
            "[data-popper-placement]",
          );
          dropdowns.forEach((dropdown) => {
            // Let Popper.js handle its own positioning
            if (dropdown._popper) {
              dropdown._popper.update();
            }
          });
        } catch (error) {
          console.warn("Resize handling error:", error);
        }
      }, 150);
    };

    // Add our controlled resize handler
    window.addEventListener("resize", handleResize, { passive: true });

    // Prevent Preline from auto-initializing on load and resize
    if (typeof window !== "undefined") {
      // Override Preline's auto initialization to prevent conflicts
      Object.defineProperty(window, "HSStaticMethods", {
        value: {
          autoInit: () => {
            // Do nothing - prevent Preline auto-initialization
          },
        },
        writable: false,
        configurable: true,
      });
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  return null;
}
