const lineReader = require('line-reader');
const fs = require('fs')
const inputFilename = 'google-10000-english-no-swears.txt'

const now = new Date()

const conf = {
  minWordSize : 1,
  fileNamePrefix : `./output-files/${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()}-`
}

let dictHasBiggerWords = true;

lineReader.eachLine(inputFilename, function(line, last) {
  const filename = `${conf.fileNamePrefix}-${line.length}-letter-words.txt`
  writeLineToFile(filename, `"${line}",`)
  console.log(filename, " - ", line, line.length);
})

const writeLineToFile = (filename, line) =>{
  fs.appendFile(filename, line, function (err) {
    if (err) {
      // append failed
      console.log("error writing file")
    }
  })
}