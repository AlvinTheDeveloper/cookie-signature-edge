"use strict";
/**
 * Sign the given `val` with `secret`.
 *
 * @param {String} val
 * @param {String} secret
 * @return {String}
 * @api private
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.unsign = exports.sign = void 0;
async function sign(val, secret) {
    if (typeof val !== 'string')
        throw new TypeError("Cookie value must be provided as a string.");
    if (secret == null)
        throw new TypeError("Secret key must be provided.");
    try {
        const encoder = new TextEncoder();
        const data = encoder.encode(val);
        const secretKey = encoder.encode(secret);
        const subtleCrypto = crypto.subtle;
        const algorithm = { name: 'HMAC', hash: 'SHA-256' };
        const cryptoKey = await subtleCrypto.importKey('raw', secretKey, algorithm, false, ['sign']);
        const signature = await subtleCrypto.sign(algorithm, cryptoKey, data);
        const signatureArray = Array.from(new Uint8Array(signature));
        const signatureString = signatureArray.map(byte => String.fromCharCode(byte)).join('');
        const base64Signature = btoa(signatureString);
        return val + '.' + base64Signature.replace(/\=+$/, '');
    }
    catch (e) {
        const error = e;
        throw new Error('Error signing the cookie: ' + error.message);
    }
}
exports.sign = sign;
/**
 * Unsign and decode the given `input` with `secret`,
 * returning `false` if the signature is invalid.
 *
 * @param {String} input
 * @param {String} secret
 * @return {String|Boolean}
 * @api private
 */
async function unsign(input, secret) {
    if (typeof input !== 'string')
        throw new TypeError("Signed cookie string must be provided.");
    if (secret == null)
        throw new TypeError("Secret key must be provided.");
    try {
        const encoder = new TextEncoder();
        const inputParts = input.split('.');
        const val = inputParts[0];
        const base64Signature = inputParts[1];
        const signature = atob(base64Signature);
        const data = encoder.encode(val);
        const signatureArray = Array.from(signature).map(char => char.charCodeAt(0));
        const signatureBytes = new Uint8Array(signatureArray);
        const subtleCrypto = crypto.subtle;
        const algorithm = { name: 'HMAC', hash: 'SHA-256' };
        const secretKey = encoder.encode(secret);
        const cryptoKey = await subtleCrypto.importKey('raw', secretKey, algorithm, false, ['verify']);
        const isValid = await subtleCrypto.verify(algorithm, cryptoKey, signatureBytes, data);
        return isValid ? val : false;
    }
    catch (e) {
        const error = e;
        throw new Error('Error verifying the cookie signature: ' + error);
    }
}
exports.unsign = unsign;
