
import {sign,unsign} from "@/index"
import {describe, expect, it} from "@jest/globals";
import { TextEncoder, TextDecoder } from 'util';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

describe("cookieSignatureEdge", ()=>{
    it('should return the original value after signing and unsigning',async ()=>{
        const originalValue = "hello";
        const secret='qwertyuiasdfghjkzxcvbnm';
        let signedValue:string|null;

        signedValue=await sign(originalValue,secret);
        expect(await unsign(signedValue,secret)).toEqual(originalValue);
    })
})
