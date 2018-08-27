const nearley = require('nearley')
let grammar = require('./n.js')
// Create a Parser object from our grammar
grammar = nearley.Grammar.fromCompiled(grammar)


let lines = [
    'the thing which your auntie gave you which you dont know what it is',
    ' quietly quickly pick up',
    'say "bojuum".',
    'pick it up.',
    'pick up everything which auntie gave me which i dont know what except the old rock from the thing using a stick.',
    'get stick with rock aaa quickly. ',
    'get stick with rock you dont know what it is. ',
    'pick the red stick up with the rock your aunt gave you, which you don\'t know what it is quickly. and get rock . and take stick . ',
    ' pick the stick and a red rock up quickly . and get rock . ',
]

// Parse something!
let parser
while (lines.length) {
    parser = new nearley.Parser(grammar)
    parser.feed(lines.shift())
}

// parser.feed('the thing which your auntie gave you which you dont know what it is')
// parser.feed(' quietly quickly pick up')
// parser.feed('say "bojuum".')
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

