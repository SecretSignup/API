/**
 * @module Redirect
 *
 */
export default ((async (...[URL = "", Status = 302]: Parameters<Type>) =>
	Response.redirect(URL, Status)) satisfies Type as Type);

import type Type from "../Interface/Redirect.js";

export const { Response } = await import(
	"@cloudflare/workers-types/experimental/index.js"
);
