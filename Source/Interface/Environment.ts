/**
 * @module Worker
 *
 */
export default interface Interface {
	Identifier: string;
	Secret: string;
	Token: KVNamespace;
}

import type { KVNamespace } from "@cloudflare/workers-types/experimental/index.js";
