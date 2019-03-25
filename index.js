const fs = require('fs');

const fileContent = fs.readFileSync("sourceData.txt", "utf8");
const sourceData = fileContent
    .split('\n')
    .filter(i => i !== '')
    .map(i => i
        .split(' ')
        .filter(i => i !== ''));


const voters = sourceData[0].slice().sort((a, b) => a - b);

const superiorityCount = (arg1, arg2) => {
    let temp = 0;
    sourceData.map(i => {
        if (i.indexOf(arg1) < i.indexOf(arg2)) temp += 1;
    });
    return temp;
};

const createAdjacencyMatrix = (superiorityCount) => {
    const adjacencyMatrix =
        Array.from(new Array(voters.length), () => new Array(voters.length).fill(0));

    for (let i = 0; i < voters.length; i += 1) {
        for (let j = 0; j < voters.length; j += 1) {
            adjacencyMatrix[i][j] = superiorityCount(voters[i], voters[j]) > voters.length / 2 ? 1 : 0;
        }
    }
    return adjacencyMatrix;
};

const methodCoupland = (adjacencyMatrix) => {
    let result = new Array(voters.length),
        temp = 0;

    for (let i = 0; i < voters.length; i += 1) {
        for (let j = 0; j < voters.length; j += 1) {
            if (adjacencyMatrix[i][j] === 0) temp -= 1;
            else temp += 1;
        }
        result[i] = temp + 1;
        temp = 0;
    }
    return result;
};

const adjacencyMatrix = createAdjacencyMatrix(superiorityCount);
const vectorCoupland = methodCoupland(adjacencyMatrix);

console.log('\n Избиратели: \n');
console.log(voters.map(i => `V${i}`));

console.log('\n Исходные данные: \n');
console.log(sourceData);

console.log('\n Матрица смежности: \n');
console.log(adjacencyMatrix);

console.log('\n Метод Коупленда: \n');
console.log(vectorCoupland);
console.log('\n');

