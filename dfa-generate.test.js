const assert = require("assert");

const { bin, binaryDivDFA, divTrans, evaluate } = require("./dfa-generate");

// binaryDivDFA //

const dfa5 = binaryDivDFA(5);
const exp = [[0, 1], [2, 3], [4, 0], [1, 2], [3, 4]];
assert.deepEqual(dfa5, exp);

// divTrans //

const trans5 = divTrans(5);
assert.equal(trans5(1, 0), 2);
assert.equal(trans5(2, 1), 0);
assert.equal(trans5(3, 1), 2);

// evaluate //

// divisibility by 3 tests
const dfa3 = binaryDivDFA(3);
const div9by3 = evaluate(bin(9), dfa3, 0, 0);
assert.equal(div9by3, true);
const div10by3 = evaluate(bin(10), dfa3, 0, 0);
assert.equal(div10by3, false);

// divisibility by 17 tests
const dfa17 = binaryDivDFA(17);
const div34by17 = evaluate(bin(34), dfa17, 0, 0);
assert.equal(div34by17, true);
const div35by17 = evaluate(bin(35), dfa17, 0, 0);
assert.equal(div35by17, false);
