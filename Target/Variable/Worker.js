var w = {
	fetch: async (...[c, y]) =>
		await (await import("itty-router/Router"))
			.Router()
			.get("/Spotify", async (d, t) => {
				const {
						searchParams: e,
						origin: f,
						pathname: u,
					} = new URL(d.url),
					o = e.get("state"),
					r =
						e.get("Identifier") ??
						o?.split("|")[0] ??
						crypto.randomUUID(),
					i =
						e.get("Key") ??
						o?.split("|")[1] ??
						(
							await crypto.subtle.exportKey(
								"jwk",
								await crypto.subtle.generateKey(
									{ name: "AES-GCM", length: 256 },
									!0,
									["encrypt", "decrypt"],
								),
							)
						).k ??
						"",
					a = new URL(
						e.get("Base") ?? o?.split("|")[2] ?? `${f}${u}`,
					),
					n = e.get("code");
				if (n) {
					const { access_token: s } = await (
						await fetch("https://accounts.spotify.com/api/token", {
							method: "POST",
							headers: {
								"Content-Type":
									"application/x-www-form-urlencoded",
								Authorization: `Basic ${(
									await import("node:buffer")
								).Buffer.from(
									`${t.Identifier}:${t.Secret}`,
								).toString("base64")}`,
							},
							body: `grant_type=authorization_code&code=${n}&redirect_uri=${encodeURIComponent(
								`${Current.origin}${Current.pathname}`,
							)}&state=${r}|${i}|${a}`,
						})
					).json();
					if (s)
						try {
							await t.Token.put(
								r,
								JSON.stringify(
									await (
										await import(
											"@common/now-playing_cards/Target/Function/Encrypt.js"
										)
									).default({ Token: s }, i),
								),
							);
						} catch {}
					return a.searchParams.append("Identifier", r), p(a.href);
				} else
					return await p(
						`https://accounts.spotify.com/authorize?client_id=${
							t.Identifier
						}&response_type=code&redirect_uri=${encodeURIComponent(
							`${Current.origin}${Current.pathname}`,
						)}&scope=user-read-email user-read-playback-state user-read-currently-playing&state=${r}|${i}|${a}`,
					);
			})
			.get("*", async () => await m({ Error: "Not Found." }, 404))
			.handle(c, y),
};
const { default: p } = await import("../Function/Redirect.js"),
	{ default: m } = await import("../Function/Response.js");
export { p as Redirect, m as Response, w as default };
