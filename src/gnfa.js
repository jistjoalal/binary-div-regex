// GNFA for use in state removal method of converting
// DFA to RE
class GNFA {
  constructor(dfa) {
    [this.gnfa, this.states] = dfaToGNFA(dfa);
  }
  removeState() {
    // remove from end in decreasing order
    // this speeds up by factor of ~8
    const remove = this.states.slice(-1)[0];
    this.gnfa = removeStateFromGNFA(remove, this.gnfa, this.states);
    this.states = this.states.slice(0, -1);
  }
}

// Returns GNFA (Generalized NFA) equivalent to DFA
function dfaToGNFA(dfa) {
  let gnfa = {};

  // flip dfa to take from, to as keys and symbol as value
  for (let from of dfa.states) {
    gnfa[from] = {};

    for (let [symbol, to] of Object.entries(dfa.dfa[from])) {
      gnfa[from][to] = symbol;
    }
  }

  // add new start + accept
  gnfa["start"] = {};
  gnfa["final"] = {};
  gnfa["start"][dfa.start] = "ε";
  for (let final of dfa.finals) {
    gnfa[final]["final"] = "ε";
  }

  // add missing edges w/ "{}"
  const states = ["start", "final", ...dfa.states];
  for (let from of states) {
    for (let to of states) {
      if (!gnfa[from] || !gnfa[from][to]) {
        gnfa[from][to] = "∅";
      }
    }
  }

  return [gnfa, states];
}

// Removes one state from GNFA, replacing all remaining edges
// w/ RE that maintains equivalent language recognition
function removeStateFromGNFA(remove, gnfa, states) {
  if (states.length <= 2) return gnfa;

  // remove = q_x
  let newGNFA = {};
  const R_xx = gnfa[remove][remove];

  for (let from of states) {
    if (from === remove) continue;

    newGNFA[from] = {};
    const R_ix = gnfa[from][remove];

    for (let to of states) {
      if (to === remove) continue;

      const R_ij = gnfa[from][to];
      const R_xj = gnfa[remove][to];

      const re = replacementRE(R_ij, R_ix, R_xx, R_xj);
      newGNFA[from][to] = re;

      // console.log(from, to, re);
    }
  }
  return newGNFA;
}

/**
 * Returns replacement RE for edge b/w states q_i and q_j
 * - for use in state removal method
 * - replace RE R_ij w/ the RE:
 * - `R_ij|R_ix(R_xx)*R_xj`
 * - where R_ij is RE b/w q_i and q_j
 * - simplify w/ basic rules
 */
function replacementRE(R_ij, R_ix, R_xx, R_xj) {
  let LHS = `${R_ij}`;
  let RHS = `(${R_ix})(${R_xx})*(${R_xj})`;

  // basic simplification
  // ∅|x = x
  if (LHS === "∅") LHS = "";
  // (∅)* = ε
  RHS = RHS.replace(/\(∅\)\*/g, "ε");
  // ∅x = ∅
  if (RHS.includes("∅")) RHS = "";
  // remove empty string
  RHS = RHS.replace(/ε/g, "");
  // remove single parenthesis (x) = x
  RHS = RHS.replace(/\((.?)\)/g, "$1");
  // replace some unnecessary parens
  RHS = RHS.replace(/\(([^\(|\)]*)\)(?!\*)/g, "$1");

  // join with union if both sides exist
  // replace w/ empty set if empty
  const newR = LHS + (LHS && RHS ? "|" : "") + RHS || "∅";
  return newR;
}

module.exports = {
  GNFA,
  dfaToGNFA,
  removeStateFromGNFA,
  replacementRE
};
