/**
 * @module Redirect
 *
 */
export default (async (...[URL = "", Status = 302]: Parameters<Interface>) =>
	Response.redirect(URL, Status)) satisfies Interface as Interface;

import type Interface from "../Interface/Redirect.js";

export const { Response } = await import(
	"@cloudflare/workers-types/experimental/index.js"
);
