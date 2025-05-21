//part1 file indexjs
// This is the page file that asks user operations and i used the variable Spmatrix that matches what i exported and the last line in thematrix.js to avoid confusion in thise file as well
const fs = require('fs');
const readline = require('readline');
const Spmatrix = require('./thematrix.js'); // 

// read file function
function readFile(path) {
  return fs.readFileSync(path, 'utf-8');
}

// ask user what operation he/ sh e may want to operate
function askoperaa() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise(resolve => {
    rl.question('Hi you!, yes you what operation do you want to perform dear? add, subtract or multiply: ', answer => {

        // so i needed this rl.close() funvtion to stop the program to keep waiting forever for more input
      rl.close();
      // and truned that into lower case as well cs maybe he/she write for examp ( aDd )then it will be so confusing
      resolve(answer.trim().toLowerCase());
    });
  });
}

// part 2 then
(async function () {
  try {
    // asking user for operations
    const operation = await askoperaa();

    // all files matrix file 1 and 2
    // But i did duplicate the (easy_sample_03_1.txt) file content into this second file because the first time when i was using two different files...
    // it did not work so if one was ( row, col: 4035x3018 ) and the other is ( row, col 3018x4035 ) it will fail. so i changed the name of file but the file...
    // content are the same. the matrix has to be the same size to operate this operations
    const file1 = readFile('../sample_inputs/easy_sample_03_1.txt'); // file 1
    const file2 = readFile('../sample_inputs/easy_sample_03_2.txt'); // file 2


    const matrixf1 = Spmatrix.fromFileContent(file1);
    const matrixf2 = Spmatrix.fromFileContent(file2);

    let result;

    // Perform the selected operation
    if (operation === 'add') {
      result = matrixf1.add(matrixf2);
    } else if (operation === 'subtract') {
      result = matrixf1.subtract(matrixf2);
    } else if (operation === 'multiply') {
      result = matrixf1.multiply(matrixf2);
    } else {
      throw new Error('wrong operation sir. please you only haveee to choose one from add, subtract, or multiply nothing more please.');
    }

    // So this is thecode part where saving the result matrix to a file is doneee
    fs.writeFileSync('../../result_matrix.txt', result.toString());

    console.log('\n Alright congs, operation successful!');
    console.log('Result saved to: result_matrix.txt go check it outtttttt');
  } catch (error) {
    console.error('\n Error:', error.message);
  }
})();
