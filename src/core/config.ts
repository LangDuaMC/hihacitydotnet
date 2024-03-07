import anim from "../assets/config/Animations.json";

export default {
	hostname: "hihacity.net",
	plausible: {
		apiHost: "https://bc.langdua.net",
	},
	posthog: [
		"phc_5EDUmkq0wcvoUZw8RbWjBaluxNO8mRIOvgC5AeeBz2i",
		{
			api_host: "https://posthog.langdua.net",
			capture_pageview: false,
		},
	],
	shama: {
		version: 1, 
		baseUrl: import.meta.env.PROD
			? "https://api.langdua.net/api/shama"
			: `http://localhost:${import.meta.env.VITE_RPC || "8880"}`,
	},
	anim,
} as const;
