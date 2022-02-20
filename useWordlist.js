import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then(res => res.json())

const WORDLIST_BASEURL = `http://localhost:3000/api/wordlist`

export const wordlist = (wordLength) => {
  const { data, error } = useSWR(`${WORDLIST_BASEURL}?wordlength=${wordLength}`, fetcher)

  // console.log(`getWordList got the ${wordLength} letter wordlist` , wordlist)
  return {
    wordlist: data,
    isLoading: !error && !wordlist,
    isError: error
  }
}