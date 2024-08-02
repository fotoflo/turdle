import { Wordlist } from "../components/Gameboard/Classes/Wordlist";
import { BASE_URL } from "../next.config";

export async function staticFetcher(url) {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Static Fetcher could not fetch ${url}`);
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
