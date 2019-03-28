const fs = require('fs');

const fileContent = fs.readFileSync('sourceData.txt', 'utf8');
const sourceData = fileContent
  .split('\n')
  .filter(i => i !== '')
  .map(i => i
    .split(' ')
    .filter(ii => ii !== ''));


const candidates = sourceData[0].slice().sort((a, b) => a - b);

const superiorityCount = (arg1, arg2) => {
  // console.log(arg1, arg2);
  let temp = 0;
  sourceData.forEach((i) => {
    if (i.indexOf(arg1) < i.indexOf(arg2)) temp += 1;
  });
  return temp;
};

const createAdjacencyMatrix = (superiorityRule) => {
  const adjacencyMatrix = Array.from(new Array(candidates.length), () => new Array(candidates.length).fill(0));

  for (let i = 0; i < candidates.length; i += 1) {
    for (let j = 0; j < candidates.length; j += 1) {
      const log = superiorityRule(candidates[i], candidates[j]);
      // console.log(log);
      adjacencyMatrix[i][j] = log > sourceData.length / 2 ? 1 : 0;
    }
  }
  return adjacencyMatrix;
};

const methodCoupland = (adjacencyMatrix) => {
  const result = new Array(candidates.length);
  let temp = 0;

  for (let i = 0; i < candidates.length; i += 1) {
    for (let j = 0; j < candidates.length; j += 1) {
      if (adjacencyMatrix[i][j] === 0) temp -= 1;
      else temp += 1;
    }
    result[i] = temp + 1;
    temp = 0;
  }
  return result;
};

const methodCondorse = (superiorityRule) => {
  const matrixCondorse = Array.from(new Array(candidates.length), () => new Array(candidates.length).fill(0));

  for (let i = 0; i < candidates.length; i += 1) {
    for (let j = 0; j < candidates.length; j += 1) {
      matrixCondorse[i][j] = superiorityRule(candidates[i], candidates[j]);
    }
  }
  let temp = 0;
  const indexOfWinnerUnderAllCandidates = [];
  // console.log(matrixCondorse);
  for (let i = 0; i < matrixCondorse.length; i += 1) {
    for (let j = 0; j < candidates.length; j += 1) {
      if (matrixCondorse[i][j] > sourceData.length / 2) temp += 1;
    }
    if (temp + 1 === candidates.length) indexOfWinnerUnderAllCandidates.push(i);
    temp = 0;
  }
  return indexOfWinnerUnderAllCandidates;
};

const adjacencyMatrix = createAdjacencyMatrix(superiorityCount);
const vectorCoupland = methodCoupland(adjacencyMatrix);
const resultCondorse = methodCondorse(superiorityCount);


console.log('\n Кандидаты: \n');
console.log(candidates.map(i => `A${i}`));

console.log('\n Исходные данные: \n');
console.log(sourceData);

console.log('\n Матрица смежности: \n');
console.log(adjacencyMatrix);

console.log('\n Метод Коупленда: \n');
console.log(vectorCoupland);

console.log('\n Метод Кондорсе: \n');
console.log(resultCondorse.length === 1 ? `Победитель по Кондорсе - A${resultCondorse[0] + 1}` : 'Победителя по Кондорсе нет');
console.log('\n');
