import { edenTreaty } from "@elysiajs/eden";
import type { App } from "../server";
import config from "./config";

const eden = edenTreaty<App>(config.shama.baseUrl, {
	async fetcher(input: string | URL | globalThis.Request, init?: RequestInit) {
		return fetch(
			input,
			Object.assign({}, init, {
				headers: {
					"X-SHAMA-VERSION": config.shama.version.toString(),
				},
			} as RequestInit),
		);
	},
	transform(response) {
		// TODO: implement this?
		if (
			false &&
			response.headers.get("X-SHAMA-VERSION") !==
				config.shama.version.toString()
		)
			throw new Error("Shama version unmet or missing");
		return response;
	},
});

export default eden;
