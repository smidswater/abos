# ABOS
A better object syntax

## Installation
### NPM
```sh
npm install abos --save
```

### Yarn
```sh
yarn add abos
```


#### Globally
```sh
npm install abos -g
```

```sh
yarn global add abos
```

##### Run
```sh
abos file.abos [--dry-run]
```


## Require
```js
const abos = require('abos');
abos(/* JSON HERE */); //eg. file.json or "{stringified json}" or json object
```

## Import
```js
import abos from 'abos';
abos(/* JSON HERE */); //eg. file.json or "{stringified json}" or json object
```


## What does it solve?
With this module your json becomes self-conscious so you can use @top (Root of JSON), @parent (Parent of current scope) or @this (Current scope).

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
