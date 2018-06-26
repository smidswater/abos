const fs = require('fs');
module.exports = function (abos) {
  if (typeof abos === 'string' && fs.existsSync(abos)) {
    abos = fs.readFileSync(abos).toString('utf8');
  }
  if (typeof abos === 'string') {
    try {
      abos = JSON.parse(abos);
    }
    catch(e) {
      console.log('Invalid JSON', e);
      return;
    }
  }
  let recursive = function(data, parents = []) {
    for (let key in data) {
      let row = data[key];
      if (typeof row === 'object' && typeof row._value === "undefined") {
        data[key] = recursive(row, [...parents, row])
      }
      if (typeof row === 'string' || typeof row._value === 'string') {
        var _hooked = row._hooked || [];
        row = row._value || row;
        row = row.replace(/\$\{(.*?)\}/g, e => {
          let variable = e.match(/\$\{(.*?)\}/);
          let variables = variable[1].split('.');
          let parent = parents.length;
          let seekIn = parents[parent-1];
          if (variables[0] === '@this') {
            seekIn = parents[--parent];
            variables.splice(0, 1);
          }
          else if (variables[0] === '@parent') {
            parent-=2;
            seekIn = parents[parent];
            variables.splice(0, 1);
          }
          else if (variables[0] === '@top') {
            seekIn = parents[0];
            parent = 0;
            variables.splice(0, 1);
          }
          if (variables.length > 1) {
            for (let i = 0; i < variables.length-1; i++) {
              if (variables[i] === '@parent') {
                seekIn = parents[--parent];
              } else {
                seekIn = seekIn[variables[i]];
              }
            }
          }
          if (typeof seekIn === "object") {
            if (seekIn[variables[variables.length-1]] !== "object" && seekIn[variables[variables.length-1]].includes('${@')) {
              var _value = seekIn[variables[variables.length-1]];
              seekIn[variables[variables.length-1]] = {
                _value,
                _hooked:  [[data, key, e]]
              };
              return e;
            } else if (seekIn[variables[variables.length-1]]._value && seekIn[variables[variables.length-1]]._value.includes('$')) {
              seekIn[variables[variables.length-1]]._hooked.push([data, key, e]);
              return e;
            }
            var _val = seekIn[variables[variables.length-1]];

            if (_hooked.length) {
              for (var i = 0; i < _hooked.length; i++) {
                _hooked[i][0][_hooked[i][1]] = _hooked[i][0][_hooked[i][1]].replace(_hooked[i][2], row.replace(e, _val))
              }
            }
            return _val;
          }
          return e;
        });
        data[key] = row;
      }
    }
    return data;
  }
  var data = recursive(abos, [abos]);
  return data;
}
