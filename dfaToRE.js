const { GNFA } = require("./gnfa");

function dfaToRE(dfa) {
  const gnfa = new GNFA(dfa);
  while (gnfa.states.length > 2) {
    gnfa.removeState();
  }
  // avoid empty matches
  return `^(${gnfa.gnfa.start.final})+$`;
}

module.exports = { dfaToRE };
