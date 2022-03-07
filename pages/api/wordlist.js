/// route at {host}/api/wordlist?wordlength=5

const fsp = require('fs').promises
const path = require('path')

export default async function handler(req, res) {
  const wordlength = req.query.wordlength
  
  try {
    if(!wordlength) throw "no wordlength"

    const filepath = path.resolve(process.cwd() + `/public/static/dictonaries/${wordlength}-letter-words.json`)
    const file_data = await fsp.readFile(filepath , 'utf8')
    const json_data = JSON.parse(file_data)
    
    res.status(200).json(json_data)
  }
  catch (error) {
    console.log(error)
    res.status(500).json({ error: `Error reading data, ${error}` })
  }
}
