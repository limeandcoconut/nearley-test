const moo = require('moo')
let lexer = moo.compile({
    // name: {
    //     match: /[a-z]+(?=[^0-9])(?=\s+)/,
    //     keywords: {
    //         'kw-class': 'class',
    //         'kw-def': 'def',
    //         'kw-if': 'if',
    //     },
    // },
    // identifier: {
    //     match: /[a-z0-9]+/,
    //     keywords: {
    //         'kw2-test': 'test1',
    //     },
    // },
    string: /"(?:\\["\\]|[^\n"\\])*"/,
    noun: [
        'rock',
        'stick',
        'thing',
    ],
    verb: [
        'get',
        'put',
        'pick',
    ],
    det: [
        'a',
        'the',
    ],
    adj: [
        'red',
        'old',
    ],
    prep: [
        'at',
        'in',
        'with',
    ],
    number: /0|[1-9][0-9]*/,
    WS: /[ \t]+/,
    // ...
})
lexer.reset('get the stick')
console.log() // -> { type: 'kw-def', value: 'def' }
let token
token = lexer.next()
while (token) {
    console.log(`${token.type}: ${token.value}`)
    token = lexer.next()
}

// token = lexer.next()
// console.log(`${token.type}: ${token.value}`)
console.log() // -> { type: 'kw-def', value: 'def' }
// console.log(lexer.next().type) // -> { type: 'kw-def', value: 'def' }
// console.log(lexer.next().type) // -> { type: 'kw-def', value: 'def' }
// console.log(lexer.next()) // -> { type: 'kw-def', value: 'def' }
// console.log(lexer.next()) // -> { type: 'kw-def', value: 'def' }
// console.log(lexer.next()) // -> { type: 'kw-def', value: 'def' }
// lexer.next() // space
// lexer.next() // -> { type: 'name', value: 'foo' }
