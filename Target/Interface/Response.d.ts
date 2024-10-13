import type { Response } from "@cloudflare/workers-types/experimental/index.js";

/**
 * @module Response
 *
 */
export default interface Type {
	(Message?: unknown, Status?: number): Promise<Response>;
}
