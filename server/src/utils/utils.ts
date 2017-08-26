
export function getArrayOfStartingLetters(): string[] {
    let listOfLetters: string[] = [];
    
    let letters = getLettersString();
    let letterCounts = getArrayOfLetterCounts();

    for (let i = 0; i < letters.length; i++) {
        for (let j = 0; j < letterCounts[i]; j++) {
            listOfLetters.push(letters[i]);
        }
    }

    return listOfLetters;
}

function getLettersString(): string {
    return "abcdefghijklmnopqrstuvwxyz*";
}

function getArrayOfLetterCounts(): number[] {
    return [9,2,2,4,12,2,3,2,9,1,1,4,2,6,8,2,1,6,4,6,4,2,2,1,2,1,2];
}

