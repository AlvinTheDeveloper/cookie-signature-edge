/**
 * Sign the given `val` with `secret`.
 *
 * @param {String} val
 * @param {String} secret
 * @return {String}
 * @api private
 */
declare function sign(val: string, secret: string): Promise<string>;
/**
 * Unsign and decode the given `input` with `secret`,
 * returning `false` if the signature is invalid.
 *
 * @param {String} input
 * @param {String} secret
 * @return {String|Boolean}
 * @api private
 */
declare function unsign(input: string, secret: string): Promise<string | boolean>;
export { sign, unsign };
