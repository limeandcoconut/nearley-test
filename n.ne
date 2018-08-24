# @builtin "whitespace.ne"

@{%
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
    conjunction: [
        'and',
        'then',
    ],
    conjunctionPunctuation: [
        ','
    ],
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
    deteterminer: [
        'a',
        'the',
    ],
    adjective: [
        'red',
        'old',
    ],
    preposition: [
        'at',
        'in',
        'with',
        'up'
    ],
    adverb: [
        'quickly',
        'quietly',
    ],
    terminator: [
        '.',
    ],
    string: /"(?:\\["\\]|[^\n"\\])*"/,
    number: /0|[1-9][0-9]*/,
    // TODO: should these be non greedy?
    WS: /[ \t]+/,
    // Remember that one of the format functions below must match this.
    word: /[a-zA-Z]/
    // ...
})
%}

# Pass your lexer object using the @lexer option:
@lexer lexer

# Use %token to match any token of that type instead of "token":
# multiplication -> %number %ws %times %ws %number {% ([first, , , , second]) => first * second %}

# Literal strings now match tokens with that text:
# trig -> "sin" %number

# @{%
# function selfPlus(id) {
#     return function (data, location, reject) {
#         return `${id}->{ ${data.join(' ')} }`
#     }
# }
# %}
input -> %WS:? sentence %WS:? %terminator %WS
    | %WS:? sentence %WS:? %terminator:?
    | input %WS %conjunction %WS input {% (data) => [data[0], data[4]] %}
    | input %conjunctionPunctuation %WS input {% (data) => [data[0], data[4]] %}
    | input %terminator %WS input {% (data) => [data[0], data[4]] %}

sentence -> verbPhrase {% id %}
    | adverbPhrase %WS verbPhrase {%
    function([adverb, _, verb], location, reject) {
        verb = Object.assign({}, verb)
        verb.modifiers = verb.modifiers.slice()
        verb.modifiers.push(adverb)
        return verb
    } %}
    | verbPhrase %WS adverbPhrase {%
    function([verb, _, adverb], location, reject) {
        verb = Object.assign({}, verb)
        verb.modifiers = verb.modifiers.slice()
        verb.modifiers.push(adverb)
        return verb
    } %}

verbPhrase -> %verb %WS nounPhrase {%
    function([verb, _, noun], location, reject) {
        verb.object = noun
        verb.modifiers = []
        return verb
    } %}
    | %verb %WS %preposition %WS nounPhrase {%
    function([verb, _, preposition, __, noun], location, reject) {
        verb.object = noun
        verb.modifiers = [preposition]
        return verb
    } %}
    | %verb %WS nounPhrase %WS %preposition {%
    function([verb, _, noun, __, preposition], location, reject) {
        verb.object = noun
        verb.modifiers = [preposition]
        return verb
    } %}
    | verbPhrase %WS prepositionPhrase {%
    function([verb, _, [preposition, __, noun]], location, reject) {
        verb.indirect = noun
        return verb
    } %}

prepositionPhrase -> %preposition %WS nounPhrase

adverbPhrase -> %adverb {% id %}

nounPhrase -> singleNoun
    | nounPhrase %WS %conjunction %WS nounPhrase {%
    function([noun1, _, conjunction, __, noun2], location, reject) {
        return [noun1, noun2]
    } %}
    | nounPhrase %WS:? %conjunctionPunctuation %WS nounPhrase {%
    function([noun1, _, conjunction, __, noun2], location, reject) {
        return [noun1, noun2]
    } %}


singleNoun -> %noun {%
    function([noun], location, reject) {
        noun.descriptors = []
        return noun
    } %}
    | %adjective %WS singleNoun {%
    function([adjective, _, noun], location, reject) {
        noun.descriptors.push(adjective)
        return noun
    } %}
    | %deteterminer %WS singleNoun {%
    function([determiner, _, noun], location, reject) {
        noun.determiner = determiner
        return noun
    } %}


# S -> VP {% selfPlus('S') %}

# VP -> v __ NP {% selfPlus('VP') %}

# PP -> p __ NP {% selfPlus('PP') %}

# NP -> n {% selfPlus('NP') %}
#     | adj __ n {% selfPlus('NP') %}
#     | det __ n {% selfPlus('NP') %}

# n -> "rock" {% id %}
#     | "thing" {% id %}
#     | "stick" {% id %}

# p -> "with" {% id %}
#     | "up" {% id %}
#     | "in" {% id %}
#     | "at" {% id %}

# v -> "pick" {% id %}
#     | "put" {% id %}
#     | "get" {% id %}

# det -> "a" {% id %}
#     | "the" {% id %}

# adj -> "red" {% id %}
#     | "old" {% id %}

# __ -> [ \t\n\v\f] {% () => '__' %}