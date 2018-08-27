// Generated automatically by nearley, version 2.15.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

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
var grammar = {
    Lexer: lexer,
    ParserRules: [
    {"name": "line$ebnf$1", "symbols": [(lexer.has("WS") ? {type: "WS"} : WS)], "postprocess": id},
    {"name": "line$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "line$subexpression$1", "symbols": ["input"]},
    {"name": "line$subexpression$1", "symbols": ["incompleteSentence"]},
    {"name": "line$ebnf$2", "symbols": ["T"], "postprocess": id},
    {"name": "line$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "line$ebnf$3", "symbols": [(lexer.has("WS") ? {type: "WS"} : WS)], "postprocess": id},
    {"name": "line$ebnf$3", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "line", "symbols": ["line$ebnf$1", "line$subexpression$1", "line$ebnf$2", "line$ebnf$3"], "postprocess": ([, [input]]) => input},
    {"name": "input", "symbols": ["sentence"], "postprocess": ([sentence]) => [sentence]},
    {"name": "input", "symbols": ["sentence", "D", "input"], "postprocess": ([sentence, , sentences]) => [sentence, ...sentences]},
    {"name": "T$ebnf$1", "symbols": [(lexer.has("WS") ? {type: "WS"} : WS)], "postprocess": id},
    {"name": "T$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "T", "symbols": ["T$ebnf$1", (lexer.has("terminator") ? {type: "terminator"} : terminator)]},
    {"name": "D", "symbols": ["T", (lexer.has("WS") ? {type: "WS"} : WS)]},
    {"name": "D$ebnf$1", "symbols": ["T"], "postprocess": id},
    {"name": "D$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "D", "symbols": ["D$ebnf$1", (lexer.has("WS") ? {type: "WS"} : WS), (lexer.has("conjunction") ? {type: "conjunction"} : conjunction), (lexer.has("WS") ? {type: "WS"} : WS)]},
    {"name": "D$ebnf$2", "symbols": [(lexer.has("WS") ? {type: "WS"} : WS)], "postprocess": id},
    {"name": "D$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "D", "symbols": ["D$ebnf$2", (lexer.has("conjunctionPunctuation") ? {type: "conjunctionPunctuation"} : conjunctionPunctuation), (lexer.has("WS") ? {type: "WS"} : WS)]},
    {"name": "incompleteSentence", "symbols": [(lexer.has("verb") ? {type: "verb"} : verb)], "postprocess":  (sentence) => {
            sentence[0].modifiers = []
            return sentence
        } },
    {"name": "incompleteSentence", "symbols": ["adverbPhrase", (lexer.has("WS") ? {type: "WS"} : WS), "incompleteSentence"], "postprocess":  ([adverb, , sentence]) => {
            sentence[0].modifiers.push(adverb)
            return sentence
        } },
    {"name": "incompleteSentence", "symbols": [(lexer.has("verb") ? {type: "verb"} : verb), (lexer.has("WS") ? {type: "WS"} : WS), (lexer.has("adverbialPreposition") ? {type: "adverbialPreposition"} : adverbialPreposition)], "postprocess":  ([verb, , adverb]) => {
            verb.modifiers = [adverb]
            return [verb]
        } },
    {"name": "incompleteSentence", "symbols": ["nounPhrase"]},
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
    {"name": "verbPhrase", "symbols": [(lexer.has("verb") ? {type: "verb"} : verb), (lexer.has("WS") ? {type: "WS"} : WS), (lexer.has("adverbialPreposition") ? {type: "adverbialPreposition"} : adverbialPreposition), (lexer.has("WS") ? {type: "WS"} : WS), "nounPhrase"], "postprocess": 
        function([verb, , preposition, , noun], location, reject) {
            verb.object = noun
            verb.modifiers = [preposition]
            return verb
        } },
    {"name": "verbPhrase", "symbols": [(lexer.has("verb") ? {type: "verb"} : verb), (lexer.has("WS") ? {type: "WS"} : WS), "nounPhrase", (lexer.has("WS") ? {type: "WS"} : WS), (lexer.has("adverbialPreposition") ? {type: "adverbialPreposition"} : adverbialPreposition)], "postprocess": 
        function([verb, , noun, , preposition], location, reject) {
            verb.object = noun
            verb.modifiers = [preposition]
            return verb
        } },
    {"name": "verbPhrase", "symbols": ["verbPhrase", (lexer.has("WS") ? {type: "WS"} : WS), "prepositionPhrase"], "postprocess": 
        function([verb, , [preposition, , noun]], location, reject) {
            let key = prepositionTypes[preposition] || 'indirect'
            if (verb[key]) {
                return reject
            }
            verb = Object.assign({}, verb)
            verb[key] = noun
            return verb
        } },
    {"name": "verbPhrase", "symbols": [(lexer.has("verb") ? {type: "verb"} : verb), (lexer.has("WS") ? {type: "WS"} : WS), (lexer.has("string") ? {type: "string"} : string)], "postprocess": 
        function([verb, , string], location, reject) {
            verb.object = string
            return verb
        } },
    {"name": "prepositionPhrase", "symbols": [(lexer.has("preposition") ? {type: "preposition"} : preposition), (lexer.has("WS") ? {type: "WS"} : WS), "nounPhrase"]},
    {"name": "adverbPhrase", "symbols": [(lexer.has("adverb") ? {type: "adverb"} : adverb)], "postprocess": id},
    {"name": "nounPhrase", "symbols": ["singleNoun"], "postprocess": id},
    {"name": "nounPhrase", "symbols": [(lexer.has("pronoun") ? {type: "pronoun"} : pronoun)], "postprocess": id},
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
    {"name": "singleNoun", "symbols": [(lexer.has("noun") ? {type: "noun"} : noun), (lexer.has("WS") ? {type: "WS"} : WS), "adjectivePhrase"], "postprocess": 
        function([noun, , adjectives], location, reject) {
            // noun = Object.assign({}, noun)
            // noun.descriptors = noun.descriptors.slice()
            noun.descriptors = [...adjectives]
            return noun
        } },
    {"name": "singleNoun", "symbols": [(lexer.has("adjective") ? {type: "adjective"} : adjective), (lexer.has("WS") ? {type: "WS"} : WS), "singleNoun"], "postprocess": 
        function([adjective, , noun], location, reject) {
            noun = Object.assign({}, noun)
            noun.descriptors = noun.descriptors.slice()
            noun.descriptors.push(adjective)
            return noun
        } },
    {"name": "singleNoun", "symbols": [(lexer.has("noun") ? {type: "noun"} : noun), (lexer.has("WS") ? {type: "WS"} : WS), (lexer.has("adjective") ? {type: "adjective"} : adjective), (lexer.has("WS") ? {type: "WS"} : WS), "adjectivePhrase"], "postprocess": 
        function([noun, , adjective, , adjectives], location, reject) {
            // noun = Object.assign({}, noun)
            // noun.descriptors = noun.descriptors.slice()
            noun.descriptors = [adjective]
            noun.descriptors = noun.descriptors.concat(adjectives)
            return noun
        } },
    {"name": "singleNoun", "symbols": [(lexer.has("deteterminer") ? {type: "deteterminer"} : deteterminer), (lexer.has("WS") ? {type: "WS"} : WS), "singleNoun"], "postprocess": 
        function([determiner, , noun], location, reject) {
            noun.determiner = determiner
            return noun
        } },
    {"name": "adjectivePhrase$ebnf$1$subexpression$1", "symbols": [(lexer.has("adjectivalPronoun") ? {type: "adjectivalPronoun"} : adjectivalPronoun), (lexer.has("WS") ? {type: "WS"} : WS)]},
    {"name": "adjectivePhrase$ebnf$1", "symbols": ["adjectivePhrase$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "adjectivePhrase$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "adjectivePhrase", "symbols": ["adjectivePhrase$ebnf$1", (lexer.has("complexAdjective") ? {type: "complexAdjective"} : complexAdjective)], "postprocess": ([, adjective]) => [adjective]},
    {"name": "adjectivePhrase$ebnf$2$subexpression$1", "symbols": [(lexer.has("adjectivalPronoun") ? {type: "adjectivalPronoun"} : adjectivalPronoun), (lexer.has("WS") ? {type: "WS"} : WS)]},
    {"name": "adjectivePhrase$ebnf$2", "symbols": ["adjectivePhrase$ebnf$2$subexpression$1"], "postprocess": id},
    {"name": "adjectivePhrase$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "adjectivePhrase$ebnf$3$subexpression$1$ebnf$1", "symbols": [(lexer.has("WS") ? {type: "WS"} : WS)], "postprocess": id},
    {"name": "adjectivePhrase$ebnf$3$subexpression$1$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "adjectivePhrase$ebnf$3$subexpression$1", "symbols": ["adjectivePhrase$ebnf$3$subexpression$1$ebnf$1", (lexer.has("conjunctionPunctuation") ? {type: "conjunctionPunctuation"} : conjunctionPunctuation)]},
    {"name": "adjectivePhrase$ebnf$3", "symbols": ["adjectivePhrase$ebnf$3$subexpression$1"], "postprocess": id},
    {"name": "adjectivePhrase$ebnf$3", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "adjectivePhrase", "symbols": ["adjectivePhrase$ebnf$2", (lexer.has("complexAdjective") ? {type: "complexAdjective"} : complexAdjective), "adjectivePhrase$ebnf$3", (lexer.has("WS") ? {type: "WS"} : WS), "adjectivePhrase"], "postprocess": ([, adjective1, , , [adjective2]]) => [adjective1, adjective2]}
]
  , ParserStart: "line"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
