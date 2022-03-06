/// route at {host}/api/wordlist?wordlength=5

const fsp = require('fs').promises

export default async function handler(req, res) {
  const wordlength = req.query.wordlength
  
  try {
    if(!wordlength) throw "no wordlength"

    const file_data = await fsp.readFile(`dictonaries/${wordlength}-letter-words.json`)
    // looks from the root of the project

    const json_data = JSON.parse(file_data)
    res.status(200).json(json_data)
  }
  catch (error) {
    console.log(error)
    res.status(500).json({ error: `Error reading data, ${error}` })
  }
}
