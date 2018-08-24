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
    WS: /[ \t]+/,
    // Remember that one of the format functions below must match this.
    word: /[a-zA-Z]/
    // ...
})
var grammar = {
    Lexer: lexer,
    ParserRules: [
    {"name": "input$ebnf$1", "symbols": [(lexer.has("WS") ? {type: "WS"} : WS)], "postprocess": id},
    {"name": "input$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "input$ebnf$2", "symbols": [(lexer.has("WS") ? {type: "WS"} : WS)], "postprocess": id},
    {"name": "input$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "input", "symbols": ["input$ebnf$1", "sentence", "input$ebnf$2", (lexer.has("terminator") ? {type: "terminator"} : terminator), (lexer.has("WS") ? {type: "WS"} : WS)]},
    {"name": "input$ebnf$3", "symbols": [(lexer.has("WS") ? {type: "WS"} : WS)], "postprocess": id},
    {"name": "input$ebnf$3", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "input$ebnf$4", "symbols": [(lexer.has("WS") ? {type: "WS"} : WS)], "postprocess": id},
    {"name": "input$ebnf$4", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "input$ebnf$5", "symbols": [(lexer.has("terminator") ? {type: "terminator"} : terminator)], "postprocess": id},
    {"name": "input$ebnf$5", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "input", "symbols": ["input$ebnf$3", "sentence", "input$ebnf$4", "input$ebnf$5"]},
    {"name": "input", "symbols": ["input", (lexer.has("WS") ? {type: "WS"} : WS), (lexer.has("conjunction") ? {type: "conjunction"} : conjunction), (lexer.has("WS") ? {type: "WS"} : WS), "input"], "postprocess": (data) => [data[0], data[4]]},
    {"name": "input", "symbols": ["input", (lexer.has("conjunctionPunctuation") ? {type: "conjunctionPunctuation"} : conjunctionPunctuation), (lexer.has("WS") ? {type: "WS"} : WS), "input"], "postprocess": (data) => [data[0], data[4]]},
    {"name": "input$ebnf$6", "symbols": [(lexer.has("WS") ? {type: "WS"} : WS)], "postprocess": id},
    {"name": "input$ebnf$6", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "input", "symbols": ["input", "input$ebnf$6", (lexer.has("terminator") ? {type: "terminator"} : terminator), (lexer.has("WS") ? {type: "WS"} : WS), "input"], "postprocess": (data) => [data[0], data[4]]},
    {"name": "sentence", "symbols": ["verbPhrase"], "postprocess": id},
    {"name": "sentence", "symbols": ["adverbPhrase", (lexer.has("WS") ? {type: "WS"} : WS), "verbPhrase"], "postprocess": 
        function([adverb, _, verb], location, reject) {
            verb = Object.assign({}, verb)
            verb.modifiers = verb.modifiers.slice()
            verb.modifiers.push(adverb)
            return verb
        } },
    {"name": "sentence", "symbols": ["verbPhrase", (lexer.has("WS") ? {type: "WS"} : WS), "adverbPhrase"], "postprocess": 
        function([verb, _, adverb], location, reject) {
            verb = Object.assign({}, verb)
            verb.modifiers = verb.modifiers.slice()
            verb.modifiers.push(adverb)
            return verb
        } },
    {"name": "verbPhrase", "symbols": [(lexer.has("verb") ? {type: "verb"} : verb), (lexer.has("WS") ? {type: "WS"} : WS), "nounPhrase"], "postprocess": 
        function([verb, _, noun], location, reject) {
            verb.object = noun
            verb.modifiers = []
            return verb
        } },
    {"name": "verbPhrase", "symbols": [(lexer.has("verb") ? {type: "verb"} : verb), (lexer.has("WS") ? {type: "WS"} : WS), (lexer.has("preposition") ? {type: "preposition"} : preposition), (lexer.has("WS") ? {type: "WS"} : WS), "nounPhrase"], "postprocess": 
        function([verb, _, preposition, __, noun], location, reject) {
            verb.object = noun
            verb.modifiers = [preposition]
            return verb
        } },
    {"name": "verbPhrase", "symbols": [(lexer.has("verb") ? {type: "verb"} : verb), (lexer.has("WS") ? {type: "WS"} : WS), "nounPhrase", (lexer.has("WS") ? {type: "WS"} : WS), (lexer.has("preposition") ? {type: "preposition"} : preposition)], "postprocess": 
        function([verb, _, noun, __, preposition], location, reject) {
            verb.object = noun
            verb.modifiers = [preposition]
            return verb
        } },
    {"name": "verbPhrase", "symbols": ["verbPhrase", (lexer.has("WS") ? {type: "WS"} : WS), "prepositionPhrase"], "postprocess": 
        function([verb, _, [preposition, __, noun]], location, reject) {
            verb.indirect = noun
            return verb
        } },
    {"name": "prepositionPhrase", "symbols": [(lexer.has("preposition") ? {type: "preposition"} : preposition), (lexer.has("WS") ? {type: "WS"} : WS), "nounPhrase"]},
    {"name": "adverbPhrase", "symbols": [(lexer.has("adverb") ? {type: "adverb"} : adverb)], "postprocess": id},
    {"name": "nounPhrase", "symbols": ["singleNoun"]},
    {"name": "nounPhrase", "symbols": ["nounPhrase", (lexer.has("WS") ? {type: "WS"} : WS), (lexer.has("conjunction") ? {type: "conjunction"} : conjunction), (lexer.has("WS") ? {type: "WS"} : WS), "nounPhrase"], "postprocess": 
        function([noun1, _, conjunction, __, noun2], location, reject) {
            return [noun1, noun2]
        } },
    {"name": "nounPhrase$ebnf$1", "symbols": [(lexer.has("WS") ? {type: "WS"} : WS)], "postprocess": id},
    {"name": "nounPhrase$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "nounPhrase", "symbols": ["nounPhrase", "nounPhrase$ebnf$1", (lexer.has("conjunctionPunctuation") ? {type: "conjunctionPunctuation"} : conjunctionPunctuation), (lexer.has("WS") ? {type: "WS"} : WS), "nounPhrase"], "postprocess": 
        function([noun1, _, conjunction, __, noun2], location, reject) {
            return [noun1, noun2]
        } },
    {"name": "singleNoun", "symbols": [(lexer.has("noun") ? {type: "noun"} : noun)], "postprocess": 
        function([noun], location, reject) {
            noun.descriptors = []
            return noun
        } },
    {"name": "singleNoun", "symbols": [(lexer.has("adjective") ? {type: "adjective"} : adjective), (lexer.has("WS") ? {type: "WS"} : WS), "singleNoun"], "postprocess": 
        function([adjective, _, noun], location, reject) {
            noun.descriptors.push(adjective)
            return noun
        } },
    {"name": "singleNoun", "symbols": [(lexer.has("deteterminer") ? {type: "deteterminer"} : deteterminer), (lexer.has("WS") ? {type: "WS"} : WS), "singleNoun"], "postprocess": 
        function([determiner, _, noun], location, reject) {
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
