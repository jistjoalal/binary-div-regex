// DFA construction + evaluation

class DFA {
  constructor(states, alphabet, trans, start, finals) {
    this.states = states;
    this.alphabet = alphabet;
    this.start = start;
    this.finals = finals;
    this.dfa = generateDFA(states, alphabet, trans);
  }

  evaluate(string) {
    return evaluate(string, this.dfa, this.start, this.finals);
  }
}

// Draws and returns DFA from Q, Σ, and δ
function generateDFA(states, alphabet, trans) {
  // Initialize DFA as 2d array (Q x Σ)
  let dfa = {};

  // Draw graph
  for (let curState of states) {
    dfa[curState] = {};
    for (let symbol of alphabet) {
      dfa[curState][symbol] = trans(curState, symbol);

      // could include fallback logic to dead state
      // when transition function is undefined
    }
  }
  return dfa;
}

// evaluates string through dfa
function evaluate(string, dfa, start, finals) {
  let state = start;
  for (let symbol of string) {
    state = dfa[state][symbol];
  }
  return finals.includes(state);
}

module.exports = {
  DFA,
  generateDFA,
  evaluate
};
