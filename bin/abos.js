#! /usr/bin/env node
const abos = require('../abos');
const fs = require('fs');
let dryRun = false;
let files = [];
process.argv.slice(2).forEach(function (val, index, array) {
  if (val === '--dry-run') {
    dryRun = true;
  }
  if (fs.existsSync(val)) {
    files.push(val);
  }
});

files.forEach(function(file) {
  let _abos = abos(file);
  if (dryRun) {
    console.log(file);
    console.log(_abos);
  } else {
    fs.writeFileSync(file, JSON.stringify(_abos, null, 2));
  }
});
