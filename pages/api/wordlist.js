import { promises as fs } from "fs";
import path from "path";
import Cors from "cors";

// Initialize the cors middleware
const cors = Cors({
  methods: ["GET", "HEAD"],
});

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default async function handler(req, res) {
  // Run the middleware
  await runMiddleware(req, res, cors);

  // Only allow GET requests
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const wordLength = req.query.wordlength;

  try {
    // Validate wordLength
    if (
      !wordLength ||
      !/^\d+$/.test(wordLength) ||
      parseInt(wordLength) < 3 ||
      parseInt(wordLength) > 15
    ) {
      throw new Error("Invalid word length");
    }

    const filePath = path.join(
      process.cwd(),
      "public",
      "dictonaries",
      `${wordLength}-letter-words.json`
    );

    // Check if file exists
    await fs.access(filePath);

    const fileData = await fs.readFile(filePath, "utf8");
    const jsonData = JSON.parse(fileData);

    // Set cache headers
    res.setHeader(
      "Cache-Control",
      "public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800"
    );

    res.status(200).json(jsonData);
  } catch (error) {
    console.error(`Error in wordlist API: ${error.message}`);

    if (error.message === "Invalid word length" || error.code === "ENOENT") {
      res
        .status(400)
        .json({ error: "Invalid word length or wordlist not found" });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
