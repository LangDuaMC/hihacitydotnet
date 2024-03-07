import { Elysia } from "elysia";

import * as t from "@sinclair/typebox";
import config from "../core/config";

import { version } from "../../package.json";

const app = new Elysia()
	.get("/", () => ({
		msg: "Hello World!",
	}))
	.head(
		"/rpc/presence",
		({ body: { version: ver }, set }) => {
			if (ver.shama !== config.shama.version || ver.package !== version) {
				set.status = "Failed Dependency";
				return {
					msg: "proto might be outdated.",
					data: {
						proto: {
							shama_version: config.shama.version,
							package_version: version,
						},
					},
				};
			}
			return {
				msg: "lgtm",
			};
		},
		{
			body: t.Object({
				version: t.Object({
					shama: t.Integer(),
					package: t.String(),
				}),
			}),
		},
	)
	.listen(8880);

export type App = typeof app;
