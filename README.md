# cookie-signature-edge
#### A package that sign and unsign cookies for Edge API Routes.

## Installation
### With NPM
```bash
npm i cookie-signature-edge --save
```
### With Yarn
```bash
yarn add cookie-signature-edge --save
```

## Example
### Use this module in Edge API Routes
```js
import {sign,unsign} from 'cookie-signature-edge'

export const config = {
  runtime: 'edge',
}

export default async (req) => {
  const value = "hello2";
  const secret='qwertyuiasdfghjkzxcvbnm';
  const signedValue=await sign(value,secret);
  const unsignedValue = await unsign(signedValue,secret)
  console.log(unsignedValue);
  // value===unsignedValue
  // unfinished code ...
}

```
## Contribution
#### Suggestions with code examples or pull requests are encouraged.
