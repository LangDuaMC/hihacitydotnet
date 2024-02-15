import Plausible from "plausible-tracker";
import config from "./config";

const k = (function anyDispatchInit() {
  const events = {
    TrackedMouseDispatch: (_: string) => {},
  };
  if (import.meta.env.PROD)
    window.location.hostname === config.hostname &&
      (function OnlyProduction() {
        const { trackPageview, trackEvent } = Plausible({
          domain: config.hostname,
          ...config.plausible
        });
        trackPageview();
        events.TrackedMouseDispatch = function TrackedMouseDispatch(
          reportName: string
        ) {
          trackEvent("click", {
            props: {
              entity: reportName,
            },
          });
        };
      })();
  else console.info("Lazy thread won't track you as youre in development");
  return events;
})();

document.addEventListener(
  "click",
  function DOMClickEvent(e) {
    const t = e.target as HTMLElement,
      ent = t.getAttribute("data-report-entity");
    if (ent) k.TrackedMouseDispatch(ent);
  },
  false
);
