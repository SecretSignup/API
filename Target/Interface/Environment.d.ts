import type { KVNamespace } from "@cloudflare/workers-types/experimental/index.js";

/**
 * @module Worker
 *
 */
export default interface Type {
	Identifier: string;
	Secret: string;
	Token: KVNamespace;
}
