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
    // Remember that one of the format functions below must match this.
    WS: /[ \t]+/,
    word: /[a-zA-Z]/
})
%}

# Pass your lexer object using the @lexer option:
@lexer lexer

# @{%
# function selfPlus(id) {
#     return function (data, location, reject) {
#         return `${id}->{ ${data.join(' ')} }`
#     }
# }
# %}
input -> %WS:? sentence delimiter sentence T:? %WS:? {% ([, sentence1, , sentence2]) => [sentence1, sentence2] %}

T -> %WS:? %terminator

delimiter -> T %WS
    # Consider adding:
    # and,
    # Consider adding:
    # | T %WS:? %conjunction %WS
    # And normalizing for allowing a lack of space like so: "N,and N"
    | T:? %WS %conjunction %WS
    | %WS:? %conjunctionPunctuation %WS

sentence -> verbPhrase {% id %}
    | adverbPhrase %WS verbPhrase {%
    function([adverb, , verb], location, reject) {
        verb = Object.assign({}, verb)
        verb.modifiers = verb.modifiers.slice()
        verb.modifiers.push(adverb)
        return verb
    } %}
    | verbPhrase %WS adverbPhrase {%
    function([verb, , adverb], location, reject) {
        verb = Object.assign({}, verb)
        verb.modifiers = verb.modifiers.slice()
        verb.modifiers.push(adverb)
        return verb
    } %}

verbPhrase -> %verb %WS nounPhrase {%
    function([verb, , noun], location, reject) {
        verb.object = noun
        verb.modifiers = []
        return verb
    } %}
    | %verb %WS %preposition %WS nounPhrase {%
    function([verb, , preposition, , noun], location, reject) {
        verb.object = noun
        verb.modifiers = [preposition]
        return verb
    } %}
    | %verb %WS nounPhrase %WS %preposition {%
    function([verb, , noun, , preposition], location, reject) {
        verb.object = noun
        verb.modifiers = [preposition]
        return verb
    } %}
    | verbPhrase %WS prepositionPhrase {%
    function([verb, , [preposition, , noun]], location, reject) {
        verb.indirect = noun
        return verb
    } %}

prepositionPhrase -> %preposition %WS nounPhrase

adverbPhrase -> %adverb {% id %}

nounPhrase -> singleNoun
    | nounPhrase %WS %conjunction %WS nounPhrase {%
    function([noun1, , conjunction, , noun2], location, reject) {
        return [noun1, noun2]
    } %}
    | nounPhrase %WS:? %conjunctionPunctuation %WS nounPhrase {%
    function([noun1, , conjunction, , noun2], location, reject) {
        return [noun1, noun2]
    } %}


singleNoun -> %noun {%
    function([noun], location, reject) {
        noun.descriptors = []
        return noun
    } %}
    | %adjective %WS singleNoun {%
    function([adjective, , noun], location, reject) {
        noun.descriptors.push(adjective)
        return noun
    } %}
    | %deteterminer %WS singleNoun {%
    function([determiner, , noun], location, reject) {
        noun.determiner = determiner
        return noun
    } %}
