export async function staticFetcher(url) {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Static Fetcher could not fetch ${url}`);
  }

  const data = await res.json();
  console.log(`### staticFetcher fetched ${data.length}`);

  return data;
}
