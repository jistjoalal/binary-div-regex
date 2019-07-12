const assert = require("assert");

const { bin, randInt } = require("../helpers");
const { binaryDivDFA, divTrans, generateRE } = require("../divisibility");

describe("binaryDivDFA", () => {
  it("generates DFA for k = 5", () => {
    const dfa5 = binaryDivDFA(5);
    const exp = [[0, 1], [2, 3], [4, 0], [1, 2], [3, 4]];
    assert.deepEqual(dfa5.dfa, exp);
  });
});

describe("divTrans", () => {
  it("returns valid transitions for k = 5", () => {
    const trans5 = divTrans(5);
    assert.equal(trans5(1, 0), 2);
    assert.equal(trans5(2, 1), 0);
    assert.equal(trans5(3, 1), 2);
  });
});

describe("DFA.evaluate", () => {
  it("recognizes binary divisibility by 3", () => {
    const dfa3 = binaryDivDFA(3);
    const div9by3 = dfa3.evaluate(bin(9));
    assert.equal(div9by3, true);
    const div10by3 = dfa3.evaluate(bin(10));
    assert.equal(div10by3, false);
  });

  it("recognizes binary divisibility by 7", () => {
    const dfa17 = binaryDivDFA(17);
    const div34by17 = dfa17.evaluate(bin(34));
    assert.equal(div34by17, true);
    const div35by17 = dfa17.evaluate(bin(35));
    assert.equal(div35by17, false);
  });
});

describe("generateRE", () => {
  it("generates valid REs", () => {
    // k = 16 throws RegEx too big error
    // k > 13 takes >1 sec to compile the RE
    const testKTo = 10;
    for (let k = 1; k <= testKTo; k++) {
      testGenerateREForK(k);
    }
  });
});

describe("factor combination", () => {
  it("combines R2 and R3 to build R6", () => {
    // factor combination
    const k = 6;
    const re2 = generateRE(2);
    const re3 = generateRE(3);
    const re = new RegExp(`(?=${re2})${re3}`);

    testREForK(re, k);
  });
});

// test helpers

function testGenerateREForK(k) {
  const reString = generateRE(k);
  const re = new RegExp(reString);
  testREForK(re, k);
}

function testREForK(re, k) {
  const numTests = 10;
  const randRange = 10e10;
  for (let i = 0; i < numTests; i++) {
    const n = randInt(randRange);
    testREForKn(re, k, n);
  }
}

function testREForKn(re, k, n) {
  const res = re.test(bin(n));
  const exp = n % k == 0;
  assert.equal(res, exp, assertMsg(k, n, res, exp));
}

function assertMsg(k, n, res, exp) {
  return `k = ${k}, n = ${n}, res = ${res}, exp = ${exp}`;
}