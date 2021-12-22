

const emptyChar = '_'
    , terminalChars = ['a', 'b']
    , nonTerminalChars = ['S', 'B', 'C']
    , termForm = new Array(terminalChars.length)
    , pairForm = new Array(nonTerminalChars.length).map(_ => new Array(nonTerminalChars.length))

function addTerm(nonTerminal, terminal) {
    let i = terminalChars.indexOf(terminal)
    if (i === -1)
        throw new Error(`'${terminal}' not found in terminal symbols`)

    termForm[i] = (termForm[i] ?? '') + nonTerminal
}

function addPair(nonTerminal, pair) {
    validatePairLength(pair)

    let [x, y] = [ nonTerminalChars.indexOf(pair[0]), nonTerminalChars.indexOf(pair[1]) ]
    pairForm[x][y] = (pairForm[x][y] ?? '') + nonTerminal 
}

function checkLanguage(word) {
    let triangleMatrix = writeFirstColumn(generateMatrix(word.length), word)

    while(tryWriteLastColumn(triangleMatrix)){}
    
    let firArr = triangleMatrix[triangleMatrix.length - 1]

    return firArr[firArr.length - 1] !== emptyChar
}

function getNonTerminalsByTerminal(terminal) {
    let i = terminalChars.indexOf(terminal);
    return i == -1
        ? emptyChar
        : termFrom[i]; 
}
function getCharsByPair(pair) {
    validatePairLength(pair);

    let [x, y] = [ nonTerminalChars.indexOf(pair[0]), nonTerminalChars.indexOf(pair[1]) ]
    return pairFrom[x, y] ?? emptyChar;
}

function generateMatrix(wordLength) {
    let matrix = new Array(wordLength)
    
    for (let i = 0; i < wordLength; i++)
        matrix[wordLength - i - 1] = new Array(i + 1)
    
    return matrix
}

function validatePairLength(pair) { 
    if (pair.length !== 2)
        throw new Error('pair must contains 2 symbols');
}

function writeFirstColumn(matrix, word) {
    for (let i = 0; i < matrix[0].length; i++)
        matrix[0][i] = GetNonTerminalsByTerminal(word[i])
    return matrix
}

function tryWriteLastColumn(matrix) {
    let i = getLastEmptyIndex(matrix)
    if (i === matrix.length)
        return false

    for (let y = 1; y <= matrix[i].length; y++) {
        let nonTerminals = getAllPairs(matrix[i - 1][y - 1], matrix[i - 1][y])
            .map(_ => getCharsByPair(_))
            .filter(_ => _)

        matrix[i][y - 1] = nonTerminals.length == 0
            ? emptyChar
            : nonTerminals;
    }

    return true;
}

function getLastEmptyIndex(matrix) {
    let i = 0;
    for (; i < matrix.length; i++)
        if (matrix[i][0] === undefined)
            break

    return i;
}

function getAllPairs(first, second) {
    first.replace('_', '')
        .map(_ => second.replace('_', '').map(__ => _.toString() + __))
}

addTerm('S', 'a');
addTerm('B', 'b');
addTerm('C', 'b');

addPair('S', "SB");
addPair('B', "BC");
addPair('C', "CC");

let wordsToCheck = [ "abcbc", "abaacb", "babcba" ]

wordsToCheck.forEach(_ => console.log(`The word '${_}' in language - ${checkLanguage(_)}`));