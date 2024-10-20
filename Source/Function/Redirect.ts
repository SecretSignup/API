import type Interface from "../Interface/Redirect.js";

/**
 * @module Redirect
 *
 */
export default (async (...[URL = "", Status = 302]) =>
	Response.redirect(URL, Status)) satisfies Interface as Interface;

export const { Response } = await import(
	"@cloudflare/workers-types/experimental/index.js"
);
