const lineReader = require('line-reader');
const fs = require('fs')
const inputFilename = 'google-10000-english-no-swears.txt'

const now = new Date()

const conf = {
  minWordSize : 1,
  outputDir: "./outputFiles",
}

if (!fs.existsSync(conf.outputDir)){
    fs.mkdirSync(conf.outputDir);
}

const createdFiles = []

lineReader.eachLine(inputFilename, function(line, last) {
  const filename = `${conf.outputDir}/${line.length}-letter-words.txt`

  if( !fs.existsSync(filename) ){
    writeLineToFile(filename, `["${line}"`)
    createdFiles.push(filename)
    console.log(`creating ${filename}`)
    return
  } 

  writeLineToFile(filename, `,"${line}"`)
  // console.log(filename, " - ", line, line.length);

  if(last){
    for(i in createdFiles){
      console.log(`closing file ${createdFiles[i]}`);
      writeLineToFile(createdFiles[i], "]")
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