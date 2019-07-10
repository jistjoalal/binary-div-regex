// helpers //

// Returns array from 0 to n-1
function rng(n) {
  return [...Array(n).keys()];
}

// returns binary string of n
function bin(n) {
  return n.toString(2);
}

// Draws and returns DFA from Q, Σ, and δ
function generateDFA(states, alphabet, trans) {
  // Initialize DFA as 2d array (Q x Σ)
  let dfa = rng(states.length).map(row => rng(alphabet.length));

  // Draw graph
  for (let curState of states) {
    for (let symbol of alphabet) {
      dfa[curState][symbol] = trans(curState, symbol);

      // could include fallback logic to dead state
      // when transition function is undefined
    }
  }
  return dfa;
}

// evaluates string through dfa
function evaluate(string, dfa, start, final) {
  let state = start;
  for (let symbol of string) {
    state = dfa[state][symbol];
  }
  // to handle multiple final states, we could pass "finals" array
  // and check accept/reject with "finals.include(state)"
  return state === final;
}

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

  return generateDFA(states, alphabet, trans);
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

module.exports = {
  bin,
  binaryDivDFA,
  divTrans,
  evaluate
};
