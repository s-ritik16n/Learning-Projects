const assert = require('assert');

assert.deepEqual({a:1},{a:'1'});    //OK, 1 = '1'

assert.deepStrictEqual({a:1},{a:'1'},'unequal');  // AssertionError: { a: 1 } deepStrictEqual { a: '1' }
                                        // because 1 !== '1' using strict equality