/**
 * @module Redirect
 *
 */
export default interface Interface {
	(URL?: string, Status?: number): Promise<Response>;
}

import type { Response } from "@cloudflare/workers-types/experimental/index.js";
