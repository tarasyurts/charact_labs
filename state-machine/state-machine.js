
const alphabet = 'abc'

const auto = [
    [ 'X', 'b', 'X', 'X' ],
    [ 'a', 'X', 'c', 'X' ],
    [ 'a', 'b', 'X', 'X' ],
    [ 'a', 'X', 'X', 'X' ],
]

const getLetterPossibleStates = letter => 
    auto[getLetterStateIndex(letter)].map(_ => _ === 'X' ? 0 : 1)

const getLetterStateIndex = letter =>
    letter == 'S' ? alphabet.length : alphabet.indexOf(letter)

const stepAuto = (states, letter) => 
    states[getLetterStateIndex(letter)] === 1
        ? getLetterPossibleStates(letter)
        : [...Array(auto.length)].map(_ => 0)

const passAuto = (states, letters) =>
    letters.split('').reduce((acc, _) => {
        console.log(`STEP | Letter: ${_} | Current state: ${acc}`);
        return stepAuto(acc, _)
    } , states)

const language = text => {
    return testStates(passAuto(getLetterPossibleStates('S'), text), getLetterPossibleStates(text[text.length - 1]))
}

const testStates = (firStates, secStates) => {
    for (let i = 0; i < firStates.length; i++) 
        if (firStates[i] !== secStates[i])
            return 0
    return 1
}

//=============

[ 'abcbc', 'abaabc', 'babacba' ]
    .forEach(_ => console.log(`Is '${_}' word in the language: ${language(_) ? 'YES' : 'NO'}\n`))
