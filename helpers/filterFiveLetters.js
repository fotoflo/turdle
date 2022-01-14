const lineReader = require('line-reader');
const fs = require('fs')
const inputFilename = 'google-10000-english-no-swears.txt'
const outputFilename = 'fiveLetterWords.txt'

lineReader.eachLine(inputFilename, function(line, last) {
  if(line.length == 5){
    writeLineToFile(`"${line}",`)
    console.log(line, line.length);
  }
    
});

const writeLineToFile = (line) =>{
  fs.appendFile(outputFilename, line, function (err) {
    if (err) {
      // append failed
      console.log("error writing file")
    }
  })
}