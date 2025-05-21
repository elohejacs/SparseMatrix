// so in this ( thematrix.js ) file i parsed matrix with normal string methods which were easy to work with since parsing with regex/regular expression was nearly impossible and hard to use anyway
class Spmatrix {

    //  created a sparse matrix with rows and columns
    constructor(numrows, numcols) {
      this.rows = numrows;
      this.cols = numcols;
      this.data = new Map(); // this is only to store non zeros values
    }
  
    // i used this static format to Read and create a matrix from a file's content and slipt them
    static fromFileContent(fileText) {
      const lines = fileText.trim().split('\n'); 
  
      // creatd the first line rows and column
      const numrows = parseInt(lines[0].split('=')[1]);
      const numcols = parseInt(lines[1].split('=')[1]);
  
      const matrix = new Spmatrix(numrows, numcols);
  
      // so here i did went  through each of the remaining lines
      for (let i = 2; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line === '') continue; // i used a simple ( if condition) that if the line is blank then skip it
  
        // removing  brackets and also add a comma btn 
        const nobc = line.replace('(', '').replace(')', '');
        const parts = nobc.split(',');
  
        if (parts.length !== 3) {
          throw new Error('input file has wrong format size: ' + line);
        }
  
        const row = parseInt(parts[0].trim());
        const col = parseInt(parts[1].trim());
        const val = parseInt(parts[2].trim());
  
        if (isNaN(row) || isNaN(col) || isNaN(val)) {
          throw new Error('lines are not enoughh: ' + line);
        }
  
        matrix.set(row, col, val);
      }
  
      return matrix;
    }
  
    // so the values to be stored here should be removed if are 00000000000S zeros
    set(row, col, value) {
      const key = `${row},${col}`;
      if (value !== 0) this.data.set(key, value);
      else this.data.delete(key);
    }
  
    // get a value or return 0
    get(row, col) {
      const key = `${row},${col}`;
      return this.data.get(key) || 0;
    }
  
    // addition function
    add(other) {
      if (this.rows !== other.rows || this.cols !== other.cols) {
        throw new Error('addition failed');
      }
  
      const result = new Spmatrix(this.rows, this.cols);
  
      for (let [key, value] of this.data) {
        result.data.set(key, value);
      }
  
      for (let [key, value] of other.data) {
        const sum = (result.data.get(key) || 0) + value;
        if (sum !== 0) result.data.set(key, sum);
        else result.data.delete(key);
      }
  
      return result;
    }
  
    // sub function 
    subtract(other) {

      const result = new Spmatrix(this.rows, this.cols);
  
      for (let [key, value] of this.data) {
        result.data.set(key, value);
      }
  
      for (let [key, value] of other.data) {
        const diff = (result.data.get(key) || 0) - value;
        if (diff !== 0) result.data.set(key, diff);
        else result.data.delete(key);
      }
  
      return result;
    }
    // multplicaton function

    multiply(other) {
      if (this.cols !== other.rows) {
        throw new Error('Can not multiply');
      }
  
      const result = new Spmatrix(this.rows, other.cols);
  
      for (let [key1, val1] of this.data) {
        const [row1, colA] = key1.split(',').map(Number);
  
        for (let col2 = 0; col2 < other.cols; col2++) {
          const val2 = other.get(colA, col2);
          if (val2 !== 0) {
            const current = result.get(row1, col2);
            result.set(row1, col2, current + val1 * val2);
          }
        }
      }
  
      return result;
    }
  
    // converting to a text format
    toString() {
      const lines = [`rows=${this.rows}`, `cols=${this.cols}`];
      for (let [key, val] of this.data) {
        lines.push(`(${key}, ${val})`);
      }
      return lines.join('\n');
    }
  }
  // so this module.expo... line line is what i used to share code from this ( thematrix.js ) file with  (index.js) file so the workflow can be much more easier and very open to use. 
  module.exports = Spmatrix;
  
