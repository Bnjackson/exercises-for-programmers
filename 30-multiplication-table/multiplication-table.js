const multiplicationNums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

function outputMultiplicationTable() {
    for (let i = 0; i < multiplicationNums.length; i++) {
        for (let j = 0; j < multiplicationNums.length; j++) {
            console.log(`${multiplicationNums[i]} * ${multiplicationNums[j]} = ${multiplicationNums[i] * multiplicationNums[j]}`);
        }
    }
}

outputMultiplicationTable();