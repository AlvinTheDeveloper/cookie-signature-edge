/**
 * Sign the given `val` with `secret`.
 *
 * @param {String} val
 * @param {String} secret
 * @return {String}
 * @api private
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
function sign(val, secret) {
    return __awaiter(this, void 0, void 0, function () {
        var encoder, data, secretKey, subtleCrypto, algorithm, cryptoKey, signature, signatureArray, signatureString, base64Signature, e_1, error;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (typeof val !== 'string')
                        throw new TypeError("Cookie value must be provided as a string.");
                    if (secret == null)
                        throw new TypeError("Secret key must be provided.");
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    encoder = new TextEncoder();
                    data = encoder.encode(val);
                    secretKey = encoder.encode(secret);
                    subtleCrypto = crypto.subtle;
                    algorithm = { name: 'HMAC', hash: 'SHA-256' };
                    return [4 /*yield*/, subtleCrypto.importKey('raw', secretKey, algorithm, false, ['sign'])];
                case 2:
                    cryptoKey = _a.sent();
                    return [4 /*yield*/, subtleCrypto.sign(algorithm, cryptoKey, data)];
                case 3:
                    signature = _a.sent();
                    signatureArray = Array.from(new Uint8Array(signature));
                    signatureString = signatureArray.map(function (byte) { return String.fromCharCode(byte); }).join('');
                    base64Signature = btoa(signatureString);
                    return [2 /*return*/, val + '.' + base64Signature.replace(/\=+$/, '')];
                case 4:
                    e_1 = _a.sent();
                    error = e_1;
                    throw new Error('Error signing the cookie: ' + error.message);
                case 5: return [2 /*return*/];
            }
        });
    });
}
/**
 * Unsign and decode the given `input` with `secret`,
 * returning `false` if the signature is invalid.
 *
 * @param {String} input
 * @param {String} secret
 * @return {String|Boolean}
 * @api private
 */
function unsign(input, secret) {
    return __awaiter(this, void 0, void 0, function () {
        var encoder, inputParts, val, base64Signature, signature, data, signatureArray, signatureBytes, subtleCrypto, algorithm, secretKey, cryptoKey, isValid, e_2, error;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (typeof input !== 'string')
                        throw new TypeError("Signed cookie string must be provided.");
                    if (secret == null)
                        throw new TypeError("Secret key must be provided.");
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    encoder = new TextEncoder();
                    inputParts = input.split('.');
                    val = inputParts[0];
                    base64Signature = inputParts[1];
                    signature = atob(base64Signature);
                    data = encoder.encode(val);
                    signatureArray = Array.from(signature).map(function (char) { return char.charCodeAt(0); });
                    signatureBytes = new Uint8Array(signatureArray);
                    subtleCrypto = crypto.subtle;
                    algorithm = { name: 'HMAC', hash: 'SHA-256' };
                    secretKey = encoder.encode(secret);
                    return [4 /*yield*/, subtleCrypto.importKey('raw', secretKey, algorithm, false, ['verify'])];
                case 2:
                    cryptoKey = _a.sent();
                    return [4 /*yield*/, subtleCrypto.verify(algorithm, cryptoKey, signatureBytes, data)];
                case 3:
                    isValid = _a.sent();
                    return [2 /*return*/, isValid ? val : false];
                case 4:
                    e_2 = _a.sent();
                    error = e_2;
                    throw new Error('Error verifying the cookie signature: ' + error);
                case 5: return [2 /*return*/];
            }
        });
    });
}
export { sign, unsign };
