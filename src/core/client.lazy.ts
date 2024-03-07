import Plausible from "plausible-tracker";
import posthog from "posthog-js";

import config from "./config";
import pj from "../../package.json";
import eden from "./eden";

posthog.init(...config.posthog);

const k = (function anyDispatchInit() {
	const events = {
		TrackedMouseDispatch: (_: string) => {},
	};
	if (import.meta.env.PROD)
		window.location.hostname === config.hostname &&
			(function OnlyProduction() {
				const { trackPageview, trackEvent } = Plausible({
						domain: config.hostname,
						...config.plausible,
					}),
					viewProps = {
						version: pj.version,
					};

				posthog.capture("$pageview", viewProps);
				trackPageview(
					{},
					{
						props: viewProps,
					},
				);
				events.TrackedMouseDispatch = function TrackedMouseDispatch(
					reportName: string,
				) {
					const sendableProps = {
						props: {
							entity: reportName,
						},
					};
					posthog.capture("click", sendableProps);
					trackEvent("click", sendableProps);
				};
			})();
	else console.info("Lazy thread won't track you as youre in development");
	eden.rpc.presence.head({
		version: {
			shama: config.shama.version,
			package: pj.version,
		},
	});
	return events;
})();

document.addEventListener(
	"click",
	function DOMClickEvent(e) {
		const t = e.target as HTMLElement,
			ent = t.getAttribute("data-report-entity");
		if (ent) k.TrackedMouseDispatch(ent);
	},
	false,
);
