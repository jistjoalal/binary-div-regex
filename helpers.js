// helpers //

// Returns array from 0 to n-1
function rng(n) {
  return [...Array(n).keys()];
}

// returns binary string of n
function bin(n) {
  return n.toString(2);
}

// returns random int b/w 0 and u
function randInt(u) {
  return Math.floor(Math.random() * u);
}

module.exports = {
  rng,
  bin,
  randInt
};
