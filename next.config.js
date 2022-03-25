// NEXT_PUBLIC ENV is exposed to the javascript
// BUILD env only gets updated at build time
// .env.local overrides .env.development and .env.production

module.exports = {
  reactStrictMode: true,
  GA_ID: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ACTIVE,
  MIN_WORD_LENGTH: 3,
  MAX_WORD_LENGTH: 8,
  DEFAULT_WORD_LENGTH: 4,
  MAX_HINTS: 100,
  DEFAULT_SHOW_HINTS: true,
  DEFAULT_SHOW_DEBUG: process.env.NEXT_PUBLIC_BUILD_SHOW_DEBUG === 'true',
  BASE_URL: process.env.NEXT_PUBLIC_WORDCHEATER_BASE_URL,
  WORDLIST_API_PATH: '/api/wordlist',
  compiler: {
    styledComponents: true,
  }
}