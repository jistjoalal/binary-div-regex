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
- Currently capable of generating REs up to k = 14.
- `generateRe(15)` throws a "RegEx too big" error xD
- There will be more learning!

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

[Algo for converting FSM to RE](https://qntm.org/algo)

[How to convert finite automata to regular expressions](https://cs.stackexchange.com/questions/2016/how-to-convert-finite-automata-to-regular-expressions)

[Kleene's Algorithm](https://en.wikipedia.org/wiki/Kleene's_algorithm#Example)

[FSM2Regex](http://ivanzuzak.info/noam/webapps/fsm2regex/)

[Regex Simplifier](http://ivanzuzak.info/noam/webapps/regex_simplifier/)

[Noam - Automata and Language library in JS](https://github.com/izuzak/noam)

[State Removal Method](https://cs.stackexchange.com/questions/2016/how-to-convert-finite-automata-to-regular-expressions/2389#2389)

### Video Lectures

[Theory of Computation - Harry Porter](https://www.youtube.com/playlist?list=PLbtzT1TYeoMjNOGEiaRmm_vMIwUAidnQz)

[DFA to RegEx - Neso Academy](https://www.youtube.com/watch?v=SmT1DXLl3f4)

### Misc.

[4.4.2 - REs and FSMs](http://cs.brown.edu/people/jsavage/book/pdfs/ModelsOfComputation.pdf)

[And in RE](https://www.ocpsoft.org/tutorials/regular-expressions/and-in-regex/)

[Graphviz - Graph Visualization](https://graphviz.org/)

## ideas

- combine lower factor REs w/ "And" operation
  - e.g. `RE(2) && RE(5) = RE(10)`
  - wouldn't work w/ powers of the same RE?
    - e.g. `RE(2) && RE(2) != RE(4)`?
