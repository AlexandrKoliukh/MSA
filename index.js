const fs = require('fs');

const fileContent = fs.readFileSync('sourceData.txt', 'utf8');
const sourceData = fileContent
  .split('\n')
  .filter(i => i !== '')
  .map(i => i
    .split(' ')
    .filter(ii => ii !== ''));


const alts = sourceData[0].slice().sort((a, b) => a - b);

const superiorityCount = (arg1, arg2) => {
  // console.log(arg1, arg2);
  let temp = 0;
  sourceData.forEach((i) => {
    if (i.indexOf(arg1) < i.indexOf(arg2)) temp += 1;
  });
  return temp;
};

const createAdjacencyMatrix = (superiorityRule) => {
  const adjacencyMatrix = Array.from(new Array(alts.length), () => new Array(alts.length).fill(0));

  for (let i = 0; i < alts.length; i += 1) {
    for (let j = 0; j < alts.length; j += 1) {
      const log = superiorityRule(alts[i], alts[j]);
      // console.log(log);
      adjacencyMatrix[i][j] = log > sourceData.length / 2 ? 1 : 0;
    }
  }
  return adjacencyMatrix;
};

const methodCoupland = (adjacencyMatrix) => {
  const result = new Array(alts.length);
  let temp = 0;

  for (let i = 0; i < alts.length; i += 1) {
    for (let j = 0; j < alts.length; j += 1) {
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

console.log('\n Альтернативы: \n');
console.log(alts.map(i => `A${i}`));

console.log('\n Исходные данные: \n');
console.log(sourceData);

console.log('\n Матрица смежности: \n');
console.log(adjacencyMatrix);

console.log('\n Метод Коупленда: \n');
console.log(vectorCoupland);
console.log('\n');
