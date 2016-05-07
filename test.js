Float = require('./Float.js');
var float = new Float.float8(66);
console.log(float);
const assert = require('assert');
assert(float.decimal == 0.125)
