# cookie-signature-edge
#### An Edge Runtime package that sign and unsign cookies. This package is currently for Edge Runtime only.

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
