# @builtin "whitespace.ne"

@{%
function selfPlus(id) {
    return function (data, location, reject) {
        return `${id}->{ ${data.join(' ')} }`
    }
}
%}

S -> VP {% selfPlus('S') %}

VP -> v __ NP {% selfPlus('VP') %}

PP -> p __ NP {% selfPlus('PP') %}

NP -> n {% selfPlus('NP') %}
    | adj __ n {% selfPlus('NP') %}
    | det __ n {% selfPlus('NP') %}

n -> "rock" {% id %}
    | "thing" {% id %}
    | "stick" {% id %}

p -> "with" {% id %}
    | "up" {% id %}
    | "in" {% id %}
    | "at" {% id %}

v -> "pick" {% id %}
    | "put" {% id %}
    | "get" {% id %}

det -> "a" {% id %}
    | "the" {% id %}

adj -> "red" {% id %}
    | "old" {% id %}

__ -> [ \t\n\v\f] {% () => '__' %}