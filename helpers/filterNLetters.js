const lineReader = require('line-reader');
const fs = require('fs')
const inputFilename = 'google-10000-english-no-swears.txt'

const now = new Date()

const conf = {
  minWordSize : 3,
  outputDir: "./outputFiles",
}

if (!fs.existsSync(conf.outputDir)){
    fs.mkdirSync(conf.outputDir);
}

const createdFiles = []

lineReader.eachLine(inputFilename, function(line, last) {
  if(line.length < conf.minWordSize) return;
  
  const filename = `${conf.outputDir}/${line.length}-letter-words.json`

  if( !fs.existsSync(filename) ){
    writeLineToFile(filename, `["${line}"`) // write the first line with a bracket [
    createdFiles.push(filename)
    console.log(`creating ${filename}`)
    return
  } 

  writeLineToFile(filename, `,"${line}"`) // write each line as ,"word"

  if(last){
    for(i in createdFiles){
      console.log(`closing file ${createdFiles[i]}`);
      writeLineToFile(createdFiles[i], "]") // add a bracket at the end of each file
    }
  }

})

const writeLineToFile = (filename, line) =>{
  fs.appendFile(filename, line, (err) => {
    if (err) {
      // append failed
      console.log("error writing file")
    }
  })
}