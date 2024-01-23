/**
 * @module Worker
 *
 */
export default {
	fetch: async (...[Request, Environment]: Parameters<Type["fetch"]>) =>
		await (await import("itty-router/Router"))
			.Router()
			.get("/Spotify", async (Request, Environment) => {
				const { searchParams, origin, pathname } = new URL(Request.url);

				const State = searchParams.get("state");

				const Identifier =
					searchParams.get("Identifier") ??
					State?.split("|")[0] ??
					crypto.randomUUID();

				const Key =
					searchParams.get("Key") ??
					State?.split("|")[1] ??
					(
						(await crypto.subtle.exportKey(
							"jwk",
							(await crypto.subtle.generateKey(
								{ name: "AES-GCM", length: 256 },
								true,
								["encrypt", "decrypt"],
							)) as CryptoKey,
						)) as JsonWebKey
					).k ??
					"";

				const Base = new URL(
					searchParams.get("Base") ??
						State?.split("|")[2] ??
						`${origin}${pathname}`,
				);

				const Code = searchParams.get("code");

				if (Code) {
					const { access_token } = (await (
						await fetch("https://accounts.spotify.com/api/token", {
							method: "POST",
							headers: {
								"Content-Type":
									"application/x-www-form-urlencoded",
								Authorization: `Basic ${(
									await import("node:buffer")
								).Buffer.from(
									`${Environment.Identifier}:${Environment.Secret}`,
								).toString("base64")}`,
							},
							body: `grant_type=authorization_code&code=${Code}&redirect_uri=${encodeURIComponent(
								`${Current.origin}${Current.pathname}`,
							)}&state=${Identifier}|${Key}|${Base}`,
						})
					).json()) satisfies Token;

					if (access_token) {
						try {
							await Environment.Token.put(
								Identifier,
								JSON.stringify(
									await (
										await import(
											"@common/now-playing_cards/Target/Function/Encrypt.js"
										)
									).default(
										{
											Token: access_token,
										},
										Key,
									),
								),
							);
						} catch (_Error) {}
					}

					Base.searchParams.append("Identifier", Identifier);

					return Redirect(Base.href);
				} else {
					return await Redirect(
						`https://accounts.spotify.com/authorize?client_id=${
							Environment.Identifier
						}&response_type=code&redirect_uri=${encodeURIComponent(
							`${Current.origin}${Current.pathname}`,
						)}&scope=user-read-email user-read-playback-state user-read-currently-playing&state=${Identifier}|${Key}|${Base}`,
					);
				}
			})

			.get(
				"*",
				async () =>
					await Response(
						{
							Error: "Not Found.",
						},
						404,
					),
			)
			.handle(Request, Environment),
} satisfies Type as Type;

import type Token from "../Interface/Token.js";
import type Type from "../Interface/Worker.js";

import type { JsonWebKey } from "@cloudflare/workers-types/experimental/index.js";

export const { default: Redirect } = await import("../Function/Redirect.js");

export const { default: Response } = await import("../Function/Response.js");
