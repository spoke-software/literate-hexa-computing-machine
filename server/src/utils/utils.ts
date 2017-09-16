
export function getArrayOfStartingTiles(): string[] {
    let listOftiles: string[] = [];

    let tileOptions = getTileOptions();
    let tileCounts = getTileCounts();

    for (let i = 0; i < tileOptions.length; i++) {
        for (let j = 0; j < tileCounts[i]; j++) {
            listOftiles.push(tileOptions[i]);
        }
    }

    return listOftiles;
}

function getTileOptions(): string {
    return "abcdefghijklmnopqrstuvwxyz*";
}

function getTileCounts(): number[] {
    return [9, 2, 2, 4, 12, 2, 3, 2, 9, 1, 1, 4, 2, 6, 8, 2, 1, 6, 4, 6, 4, 2, 2, 1, 2, 1, 2];
}

