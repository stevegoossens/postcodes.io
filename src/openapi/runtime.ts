/* eslint-disable */
// tslint:disable
/**
 * Postcodes.io
 * Postcodes.io allows UK postcode data to be queried over a JSON HTTP API.

Postcodes.io is an open sourced project maintained by Ideal Postcodes.

It is a free resource, allowing developers to search, reverse geocode and extract UK postcode and associated data.

 *
 * OpenAPI spec version: 1.0.0
 * Contact: 
 *
 * NOTE: This class is auto generated by OpenAPI Generator+.
 * https://github.com/karlvr/openapi-generator-plus
 * Do not edit the class manually.
 */

import fetch, { RequestInit } from "node-fetch";
export const defaultFetch = fetch;
import { Configuration } from "./configuration";

export const BASE_PATH = "https://api.postcodes.io".replace(/\/+$/, "");

/**
 *
 * @export
 */
export const COLLECTION_FORMATS = {
	csv: ",",
	ssv: " ",
	tsv: "\t",
	pipes: "|",
};

/**
 *
 * @export
 * @type FetchAPI
 */
export type FetchAPI = typeof defaultFetch;

/**
 *  
 * @export
 * @interface FetchArgs
 */
export interface FetchArgs {
	url: string;
	options: RequestInit;
}

/**
 * 
 * @export
 * @class BaseAPI
 */
export class BaseAPI {
	protected configuration?: Configuration;

	constructor(configuration?: Configuration, protected basePath: string = BASE_PATH, protected fetch: FetchAPI = defaultFetch) {
		if (configuration) {
			this.configuration = configuration;
			this.basePath = configuration.basePath || this.basePath;
		}
	}
};

/**
 * 
 * @export
 * @class RequiredError
 * @extends {Error}
 */
export class RequiredError extends Error {
	constructor(public field: string, msg?: string) {
		super(msg);
		Object.setPrototypeOf(this, RequiredError.prototype);
		this.name = "RequiredError";
	}
}