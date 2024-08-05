import { Wordlist } from "../components/Gameboard/Classes/Wordlist";
import { BASE_URL } from "../next.config";

export async function staticFetcher(url) {
  const res = await fetch(url);

  if (!res.ok) {
    console.error(`Static Fetcher could not fetch ${url}`);
    // throw new Error(`Static Fetcher could not fetch ${url}`);
    return []; // Return an empty array instead of { notFound: true }
  }

  const data = await res.json();
  console.log(`### staticFetcher fetched ${data.length}`);

  return data;
}

export async function fetchWordlist(wordLength) {
  const url = `${BASE_URL}/api/wordlist?wordlength=${wordLength}`;
  const data = await staticFetcher(url).catch((err) => {
    console.error("Error fetching wordlist:", err);
    return { notFound: true };
  });

  return new Wordlist(...data);
}

export async function fetchDefinition(word) {
  const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
  const data = await staticFetcher(url).catch((err) => {
    console.error("Error fetching defintion:", err);
    return { notFound: true };
  });

  return new Wordlist(...data);
}
