## Goal

Generate regular expressions that accept binary strings divisible by k. For example, for k = 2:

![DFA k=2](https://i.imgur.com/5r8RljY.jpg)

Output:

```
(0+11*0)*
```

### Current Attempt

- We generate a DFA capable of recognizing the language of binary strings divisible by k.
- We convert DFA to GNFA (Generalized NFA) where edges are labelled with REs instead of individual symbols
- We use the state removal method on the GNFA, redefining every other edge in the graph at each removal. This maintains equivalent language recognition
- Repeat until only 2 states left
- The 1 remaining edge is our horrendously long RE
- We do some basic RE simplification to minimize RE compilation time
- We reach some higher order k's by combining REs of lower order k's that do not share a common divisor
- Order of state removal and parenthesis simplification are the most important factors for performance

## Getting Started w/ Tests

Check out the tests for an overview of what the primary functions do. We test higher level functions related to our divisibility problem in an integration test style. The generalized FSM functions and classes are tested only implicitly.

```sh
git clone https://github.com/jistjoalal/binary-div-regex.git
cd binary-div-regex
npm install  # grab mocha and nodemon
npm test     # watches for changes
```

## Links

### Division

The idea is to generate a DFA for divisibility by k with the following formula:

```
              0           1
state (q_i):  2q_i mod k  (2q_i + 1) mod k
```

[Divisibility Machines and Regular Expressions](http://www.exstrom.com/blog/abrazolica/posts/divautomata.html)

[DFA based division](https://www.geeksforgeeks.org/dfa-based-division/)

### Conversion

[DFA to Regular Expression](https://www.gatevidyalay.com/dfa-to-regular-expression-examples-automata/)

- Visual guide to state removal method

[Algo for converting FSM to RE](https://qntm.org/algo)

- An interesting reverse algebraic approach

[How to convert finite automata to regular expressions](https://cs.stackexchange.com/questions/2016/how-to-convert-finite-automata-to-regular-expressions)

- StackExchange question full of pseudocode

[Kleene's Algorithm](https://en.wikipedia.org/wiki/Kleene's_algorithm#Example)

- Wiki page with explicit algebraic steps

[FSM2Regex](http://ivanzuzak.info/noam/webapps/fsm2regex/)

- A web conversion tool

[Regex Simplifier](http://ivanzuzak.info/noam/webapps/regex_simplifier/)

- A web simplification tool

[Noam - Automata and Language library in JS](https://github.com/izuzak/noam)

- The library that the above tools utilize

### Video Lectures

[Theory of Computation - Harry Porter](https://www.youtube.com/playlist?list=PLbtzT1TYeoMjNOGEiaRmm_vMIwUAidnQz)

- Concise lectures on automata and regular language theory (videos 1-12). Video 10 explains DFA to RE conversion

[DFA to RegEx - Neso Academy](https://www.youtube.com/watch?v=SmT1DXLl3f4)

- Part of another Theory of Computation playlist. This video shows how to convert algebraically by hand.

### Books

[Models of Computation - John Savage](http://cs.brown.edu/people/jsavage/book/pdfs/ModelsOfComputation.pdf)

- 4.4.2 - REs and FSMs

[Intro to the Theory of Computation - Michael Sipser](http://www.cs.virginia.edu/~robins/Sipser_2006_Second_Edition_Problems.pdf)

- 1.3 Regular Expressions

[Intro to Automata Theory, Languages, and Computation - John Hopcroft](https://github.com/ImaginationZ/CS389/blob/master/Introduction%20to%20Automata%20Theory%20Languages%20and%20Computation.pdf)

- 3.2 Finite Automata and Regular Expressions

### Misc.

[And in RE](https://www.ocpsoft.org/tutorials/regular-expressions/and-in-regex/)

[Graphviz - Graph Visualization](https://graphviz.org/)

## todos + ideas

- refactor simplifyParens
- refactor out a more concise solution
