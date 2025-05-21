// part 1 
// This now is the page file that asks user operations and i used the variable ( Spmatrix ) that matches what i exported and the last line in thematrix.js to avoid confusion in this file as well
const fs = require('fs');
const readline = require('readline');
const Spmatrix = require('./thematrix.js'); // 

// this function readFile is opening a text file and reads it as a string so that the 
function readFile(path) {
  return fs.readFileSync(path, 'utf-8');
}

// asks user what operation he/ sh e may want to operate
function askoperaa() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise(resolve => {
    rl.question(' Hi you!, yes you what operation do you want to perform dear? add, subtract or multiply: ', answer => {

        // so i needed this rl.close() funvtion to stop the program to keep waiting forever for more inputs from
      rl.close();
      // and turned that into lower case as well because if not then for examp user type ( aDd instead off add )then it will be so confusing
      resolve(answer.trim().toLowerCase());
    });
  });
}
//----------------------------------------------------------------------------------------------------------


// Part 2 which is the main program hereee
(async function () {
  try {
    // asking user for operations
    const operation = await askoperaa();

    // so here is to decide which files to use based on operation entered by a user
    let fileA = '../sample_inputs/easy_sample_03_1.txt';
    let fileB = '';

    if (operation === 'add' || operation === 'subtract') {
      fileB = '../sample_inputs/easy_sample_03_2.txt'; // 
    } else if (operation === 'multiply') {
      fileB = '../sample_inputs/easy_sample_03_3.txt'; // after declaring that fileB can be replaced i checked the condition if let's say user choose to use multiplication then fileB which is sample input 03-2 will turn into 03-3 to be able to multiply
    } else {
      throw new Error(' Ooh no!, you choose the wrong operation, please choose among add, subtract, or multiply nothing else please!!!.');
    }

    // parsing all matrices 
    const matrixA = Spmatrix.fromFileContent(readFile(fileA));
    const matrixB = Spmatrix.fromFileContent(readFile(fileB));

    // The main operations add sub multiply...
    let result;
    if (operation === 'add') {
      result = matrixA.add(matrixB);
    } else if (operation === 'subtract') {
      result = matrixA.subtract(matrixB);
    } else if (operation === 'multiply') {
      result = matrixA.multiply(matrixB);
    }
    //---------------------------------------------------------------------------------------------
    

    // So this is thecode part where saving the result matrix to a file is doneee
    fs.writeFileSync('../../result_matrix.txt', result.toString()); // i went back 2 times in folder that's where i choosed to store my results and as you can see the file is create automatically with writefilesyc... function and no need to creat it manually and if the file has some content in it then it will be re-writed not just having duplicated files

    console.log('\n Alright congs, operation successful!');
    console.log('And the result were saved to: result_matrix.txt go check it outtttttt');
  } catch (error) {
    console.error('\n Error:', error.message);
  }
})();
