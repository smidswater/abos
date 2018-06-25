# ABOS
A better object notation

## Installation
### NPM
```sh
npm install abos --save
```

### Yarn
```sh
yarn add abos
```


## Require
```js
const abos = require('abos');
abos(/* JSON HERE */);
```

## Import
```js
import abos from 'abos';
abos(/* JSON HERE */);
```

## What does it fix?
With this module your json becomes self-conscious so u can use @top (Root of JSON), @parent (Parent of current scope), @this (Current scope)

### Demo
```json
{
    "jsonItem1": "Hello",
    "jsonItem2": {
        "jsonItem3": "${@top.jsonItem1} W",
        "jsonItem4": "${@this.jsonItem3}or",
    },
    "jsonItem3": {
        "jsonItem4": "${@parent.jsonItem2.jsonItem4}ld"
    }
}
```

Resolves to

```json
{
    "jsonItem1": "Hello",
    "jsonItem2": {
        "jsonItem3": "Hello W",
        "jsonItem4": "Hello Wor",
    },
    "jsonItem3": {
        "jsonItem4": "Hello World"
    }
}
```
