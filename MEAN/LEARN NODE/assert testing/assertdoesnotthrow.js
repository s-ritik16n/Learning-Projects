var assert = require('assert');
assert.doesNotThrow(
()=>{
    throw new TypeError('Wrong value')
    },
        TypeError, 'Whoops'
);