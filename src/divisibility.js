const { rng } = require("./helpers");
const { DFA } = require("./dfa-generate");
const { dfaToRE } = require("./dfaToRE");

// binary divisibility //

/**
 * Binary Divisibility DFA
 * - Generate DFA that recognizes the language of binary strings
 *   divisible by some k
 */
function binaryDivDFA(k) {
  const states = rng(k);
  const alphabet = [0, 1];
  const trans = divTrans(k);
  const start = 0;
  const finals = [0];

  return new DFA(states, alphabet, trans, start, finals);
}

/**
 * Transition function for binary divisibility by k
 * - returns transition _function_
 * - expects symbol to be from {0, 1}
 */
function divTrans(k) {
  return function(state, symbol) {
    // reading 0 multiplies by 2 (left shift)
    // reading 1 multiplies by 2 and adds 1
    return (2 * state + symbol) % k;
    // for more complex transition functions,
    // we could return -1 if symbol not in alphabet
  };
}

function generateRE(k) {
  if (k === 0) return "^0$";
  if (k === 1) return "^[01]+$";
  const dfa = binaryDivDFA(k);
  let re = dfaToRE(dfa);
  // avoid empty matches
  re = `^${re.slice(0, -1)}+$`;
  return re;
}

module.exports = {
  binaryDivDFA,
  divTrans,
  generateRE
};
