const nearley = require('nearley')
const grammar = require('./n.js')

// Create a Parser object from our grammar.
const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar))

// Parse something!
parser.feed(' pick the stick and a red rock up quickly.  then get rock.')

// parser.results is an array of possible parsings.
// console.log('foo') // [[[[ "foo" ],"\n" ]]]
// console.log(parser.results) // [[[[ "foo" ],"\n" ]]]
console.log(JSON.stringify(parser.results, null, 4))