const { rng } = require("./helpers");

// DFA construction + evaluation

class DFA {
  constructor(states, alphabet, trans, start, final) {
    this.states = states;
    this.alphabet = alphabet;
    this.start = start;
    this.final = final;
    this.dfa = generateDFA(states, alphabet, trans);
  }

  evaluate(string) {
    return evaluate(string, this.dfa, this.start, this.final);
  }
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

module.exports = {
  DFA,
  generateDFA,
  evaluate
};
