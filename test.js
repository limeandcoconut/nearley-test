const nearley = require('nearley')
const grammar = require('./n.js')

// Create a Parser object from our grammar.
const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar))

// Parse something!

parser.feed('say "bojuum".')
// parser.feed('pick it up.')
// parser.feed('pick up everything which auntie gave me which i dont know what except the old rock from the thing using a stick.')
// parser.feed('pick the red stick up with the rock your aunt gave you, which you don\'t know what it is quickly. and get rock . and take stick . ')
// parser.feed(' pick the stick and a red rock up quickly . and get rock . ')

// parser.results is an array of possible parsings.
console.log(JSON.stringify(parser.results, null, 4))
for (let verb of parser.results[0]) {
    console.log(`${verb.type}, ${verb.text}`)
}
console.log(JSON.stringify(parser.results.length, null, 4))

