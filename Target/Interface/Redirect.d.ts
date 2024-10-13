import type { Response } from "@cloudflare/workers-types/experimental/index.js";

/**
 * @module Redirect
 *
 */
export default interface Type {
	(URL?: string, Status?: number): Promise<Response>;
}
