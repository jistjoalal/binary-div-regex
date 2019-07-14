const { GNFA } = require("./gnfa");

// Uses GNFA state removal to convert DFA to RE
function dfaToRE(dfa) {
  const gnfa = new GNFA(dfa);
  while (gnfa.states.length > 2) {
    gnfa.removeState();
  }
  const re = gnfa.gnfa.start.final;
  return simplifyParens(re);
}

// removes unnecessary parenthesis
function simplifyParens(re) {
  let stack = [];
  let toRemove = [];
  let ignoreStack = [];
  for (let i = 0; i < re.length; i++) {
    if (re[i] === "(") {
      stack.push(i);
      ignoreStack.push(false);
    }
    if (re[i] === "|") {
      ignoreStack.pop();
      ignoreStack.push(true);
    }
    if (re[i] === ")") {
      const partner = stack.pop();
      if (!["*", "+"].includes(re[i + 1]) && !ignoreStack.slice(-1)[0]) {
        toRemove.push(partner, i);
      }
      ignoreStack.pop();
    }
  }
  toRemove = toRemove.sort((a, b) => a - b);
  let r = "";
  let s = 0;
  for (let i of toRemove) {
    r += re.slice(s, i);
    s = i + 1;
  }
  r += re.slice(s);
  return r;
}
module.exports = { dfaToRE };
