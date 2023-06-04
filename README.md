# cookie-signature-edge
#### An Edge Runtime library that sign and unsign cookies.

## Example
```js
import {sign,unsign} from 'cookie-signature-edge'
const value = "hello";
const secret='qwertyuiasdfghjkzxcvbnm';
const signedValue=await sign(value,secret);
const unsignedValue = await unsign(signedValue,secret)
// value===unsignedValue
```
## Contribution
#### Suggestions with code examples or pull requests are encouraged.
