// Generated automatically by nearley, version 2.15.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

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
var grammar = {
    Lexer: lexer,
    ParserRules: [
    {"name": "input$ebnf$1", "symbols": [(lexer.has("WS") ? {type: "WS"} : WS)], "postprocess": id},
    {"name": "input$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "input$ebnf$2", "symbols": ["T"], "postprocess": id},
    {"name": "input$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "input$ebnf$3", "symbols": [(lexer.has("WS") ? {type: "WS"} : WS)], "postprocess": id},
    {"name": "input$ebnf$3", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "input", "symbols": ["input$ebnf$1", "sentence", "delimiter", "sentence", "input$ebnf$2", "input$ebnf$3"], "postprocess": ([, sentence1, , sentence2]) => [sentence1, sentence2]},
    {"name": "T$ebnf$1", "symbols": [(lexer.has("WS") ? {type: "WS"} : WS)], "postprocess": id},
    {"name": "T$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "T", "symbols": ["T$ebnf$1", (lexer.has("terminator") ? {type: "terminator"} : terminator)]},
    {"name": "delimiter", "symbols": ["T", (lexer.has("WS") ? {type: "WS"} : WS)]},
    {"name": "delimiter$ebnf$1", "symbols": ["T"], "postprocess": id},
    {"name": "delimiter$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "delimiter", "symbols": ["delimiter$ebnf$1", (lexer.has("WS") ? {type: "WS"} : WS), (lexer.has("conjunction") ? {type: "conjunction"} : conjunction), (lexer.has("WS") ? {type: "WS"} : WS)]},
    {"name": "delimiter$ebnf$2", "symbols": [(lexer.has("WS") ? {type: "WS"} : WS)], "postprocess": id},
    {"name": "delimiter$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "delimiter", "symbols": ["delimiter$ebnf$2", (lexer.has("conjunctionPunctuation") ? {type: "conjunctionPunctuation"} : conjunctionPunctuation), (lexer.has("WS") ? {type: "WS"} : WS)]},
    {"name": "sentence", "symbols": ["verbPhrase"], "postprocess": id},
    {"name": "sentence", "symbols": ["adverbPhrase", (lexer.has("WS") ? {type: "WS"} : WS), "verbPhrase"], "postprocess": 
        function([adverb, , verb], location, reject) {
            verb = Object.assign({}, verb)
            verb.modifiers = verb.modifiers.slice()
            verb.modifiers.push(adverb)
            return verb
        } },
    {"name": "sentence", "symbols": ["verbPhrase", (lexer.has("WS") ? {type: "WS"} : WS), "adverbPhrase"], "postprocess": 
        function([verb, , adverb], location, reject) {
            verb = Object.assign({}, verb)
            verb.modifiers = verb.modifiers.slice()
            verb.modifiers.push(adverb)
            return verb
        } },
    {"name": "verbPhrase", "symbols": [(lexer.has("verb") ? {type: "verb"} : verb), (lexer.has("WS") ? {type: "WS"} : WS), "nounPhrase"], "postprocess": 
        function([verb, , noun], location, reject) {
            verb.object = noun
            verb.modifiers = []
            return verb
        } },
    {"name": "verbPhrase", "symbols": [(lexer.has("verb") ? {type: "verb"} : verb), (lexer.has("WS") ? {type: "WS"} : WS), (lexer.has("preposition") ? {type: "preposition"} : preposition), (lexer.has("WS") ? {type: "WS"} : WS), "nounPhrase"], "postprocess": 
        function([verb, , preposition, , noun], location, reject) {
            verb.object = noun
            verb.modifiers = [preposition]
            return verb
        } },
    {"name": "verbPhrase", "symbols": [(lexer.has("verb") ? {type: "verb"} : verb), (lexer.has("WS") ? {type: "WS"} : WS), "nounPhrase", (lexer.has("WS") ? {type: "WS"} : WS), (lexer.has("preposition") ? {type: "preposition"} : preposition)], "postprocess": 
        function([verb, , noun, , preposition], location, reject) {
            verb.object = noun
            verb.modifiers = [preposition]
            return verb
        } },
    {"name": "verbPhrase", "symbols": ["verbPhrase", (lexer.has("WS") ? {type: "WS"} : WS), "prepositionPhrase"], "postprocess": 
        function([verb, , [preposition, , noun]], location, reject) {
            verb.indirect = noun
            return verb
        } },
    {"name": "prepositionPhrase", "symbols": [(lexer.has("preposition") ? {type: "preposition"} : preposition), (lexer.has("WS") ? {type: "WS"} : WS), "nounPhrase"]},
    {"name": "adverbPhrase", "symbols": [(lexer.has("adverb") ? {type: "adverb"} : adverb)], "postprocess": id},
    {"name": "nounPhrase", "symbols": ["singleNoun"]},
    {"name": "nounPhrase", "symbols": ["nounPhrase", (lexer.has("WS") ? {type: "WS"} : WS), (lexer.has("conjunction") ? {type: "conjunction"} : conjunction), (lexer.has("WS") ? {type: "WS"} : WS), "nounPhrase"], "postprocess": 
        function([noun1, , conjunction, , noun2], location, reject) {
            return [noun1, noun2]
        } },
    {"name": "nounPhrase$ebnf$1", "symbols": [(lexer.has("WS") ? {type: "WS"} : WS)], "postprocess": id},
    {"name": "nounPhrase$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "nounPhrase", "symbols": ["nounPhrase", "nounPhrase$ebnf$1", (lexer.has("conjunctionPunctuation") ? {type: "conjunctionPunctuation"} : conjunctionPunctuation), (lexer.has("WS") ? {type: "WS"} : WS), "nounPhrase"], "postprocess": 
        function([noun1, , conjunction, , noun2], location, reject) {
            return [noun1, noun2]
        } },
    {"name": "singleNoun", "symbols": [(lexer.has("noun") ? {type: "noun"} : noun)], "postprocess": 
        function([noun], location, reject) {
            noun.descriptors = []
            return noun
        } },
    {"name": "singleNoun", "symbols": [(lexer.has("adjective") ? {type: "adjective"} : adjective), (lexer.has("WS") ? {type: "WS"} : WS), "singleNoun"], "postprocess": 
        function([adjective, , noun], location, reject) {
            noun.descriptors.push(adjective)
            return noun
        } },
    {"name": "singleNoun", "symbols": [(lexer.has("deteterminer") ? {type: "deteterminer"} : deteterminer), (lexer.has("WS") ? {type: "WS"} : WS), "singleNoun"], "postprocess": 
        function([determiner, , noun], location, reject) {
            noun.determiner = determiner
            return noun
        } }
]
  , ParserStart: "input"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
