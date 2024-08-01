// NEXT_PUBLIC ENV is exposed to the javascript
// BUILD env only gets updated at build time
// .env.local overrides .env.development and .env.production

const config = {
  reactStrictMode: true,
  GA_ID: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ACTIVE,
  MIN_WORD_LENGTH: 3,
  MAX_WORD_LENGTH: 8,
  DEFAULT_WORD_LENGTH: 4,
  MAX_HINTS: 100,
  DEFAULT_SHOW_HINTS: false,
  DEBUG_MODE: process.env.NEXT_PUBLIC_DEBUG_MODE === "true",
  DEFAULT_THEME: "dark",
  BASE_URL: process.env.NEXT_PUBLIC_WORDCHEATER_BASE_URL,
  WORDLIST_API_PATH: "/api/wordlist",
  compiler: {
    styledComponents: true,
  },
};

module.exports = config;

console.log(`
  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  !!
  !!    WELCOME TO WORDCHEATER.APP
  !!
  !!   Node Version: ${process.version} (use 18!)
  !!   HOST: ${process.env.NEXT_PUBLIC_WORDCHEATER_BASE_URL}
  !!   DEBUG MODE: ${config.DEBUG_MODE}
  !!
  !!    Happy Coding!
  !!
  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  
  
  `);
