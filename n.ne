# @builtin "whitespace.ne"

@{%
const moo = require('moo')
let lexer = moo.compile({
    complexAdjective: [
        'aaa',
        /(?:your |my )?aunt(?:ie)? gave(?: you| me)/,
        /(?:you |i )?don\'?t know what(?: it is)?/,
    ],
    adjectivalPronoun: [
        'which',
    ],
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
        'everything',
        'all',
        'thing',
    ],
    verb: [
        'get',
        'take',
        'put',
        'pick',
        'say',
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
        'using',
        'from',
        'except',
    ],
    pronoun: [
        'it',
        'them',
        'those',
        'him',
        'her',
        'us',
    ],
    adverbialPreposition: [
        'up',
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
    // Consider adding a token that includes a "," for occasions when that would be allowed and ignored.
    WS: /[ \t]+/,
    word: /[a-zA-Z]/
})

let prepositionTypes = {
    from: 'from',
    except: 'except',
    using: 'tool',
    with: 'tool',
}
%}

# Pass your lexer object using the @lexer option:
@lexer lexer

line -> %WS:? (input | incompleteSentence) T:? %WS:? {% ([, [input]]) => input %}

input -> sentence {% ([sentence]) => [sentence] %}
    | sentence D input {% ([sentence, , sentences]) => [sentence, ...sentences] %}


T -> %WS:? %terminator

D -> T %WS
    # Consider adding:
    # and,
    # Consider adding:
    # | T %WS:? %conjunction %WS
    # And normalizing for allowing a lack of space like so: "N,and N"
    | T:? %WS %conjunction %WS
    | %WS:? %conjunctionPunctuation %WS

incompleteSentence -> %verb {% (sentence) => {
        sentence[0].modifiers = []
        return sentence
    } %}
    | adverbPhrase %WS incompleteSentence {% ([adverb, , sentence]) => {
        sentence[0].modifiers.push(adverb)
        return sentence
    } %}
    | %verb %WS %adverbialPreposition {% ([verb, , adverb]) => {
        verb.modifiers = [adverb]
        return [verb]
    } %}
    | nounPhrase

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
    | %verb %WS %adverbialPreposition %WS nounPhrase {%
    function([verb, , preposition, , noun], location, reject) {
        verb.object = noun
        verb.modifiers = [preposition]
        return verb
    } %}
    | %verb %WS nounPhrase %WS %adverbialPreposition {%
    function([verb, , noun, , preposition], location, reject) {
        verb.object = noun
        verb.modifiers = [preposition]
        return verb
    } %}
    | verbPhrase %WS prepositionPhrase {%
    function([verb, , [preposition, , noun]], location, reject) {
        let key = prepositionTypes[preposition] || 'indirect'
        if (verb[key]) {
            return reject
        }
        verb = Object.assign({}, verb)
        verb[key] = noun
        return verb
    } %}
    | %verb %WS %string {%
    function([verb, , string], location, reject) {
        verb.object = string
        return verb
    } %}

prepositionPhrase -> %preposition %WS nounPhrase

adverbPhrase -> %adverb {% id %}

nounPhrase -> singleNoun {% id %}
    | %pronoun {% id %}
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
    | %noun %WS adjectivePhrase {%
    function([noun, , adjectives], location, reject) {
        // noun = Object.assign({}, noun)
        // noun.descriptors = noun.descriptors.slice()
        noun.descriptors = [...adjectives]
        return noun
    } %}
    | %adjective %WS singleNoun {%
    function([adjective, , noun], location, reject) {
        noun = Object.assign({}, noun)
        noun.descriptors = noun.descriptors.slice()
        noun.descriptors.push(adjective)
        return noun
    } %}
    # Still unsure about this one.
    | %noun %WS %adjective %WS adjectivePhrase {%
    function([noun, , adjective, , adjectives], location, reject) {
        // noun = Object.assign({}, noun)
        // noun.descriptors = noun.descriptors.slice()
        noun.descriptors = [adjective]
        noun.descriptors = noun.descriptors.concat(adjectives)
        return noun
    } %}
    | %deteterminer %WS singleNoun {%
    function([determiner, , noun], location, reject) {
        noun.determiner = determiner
        return noun
    } %}

adjectivePhrase -> (%adjectivalPronoun %WS):? %complexAdjective  {% ([, adjective]) => [adjective] %}
    | (%adjectivalPronoun %WS):? %complexAdjective (%WS:? %conjunctionPunctuation):? %WS adjectivePhrase {% ([, adjective1, , , [adjective2]]) => [adjective1, adjective2] %}

