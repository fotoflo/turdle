NOTE tests and mocks for components and helpers are stored with said components and helpers. 

This directory contains 

/__test__/setupEnv.js - loads the env config
   • https://stackoverflow.com/questions/63934104/environment-variables-undefined-in-nextjs-when-running-jest

/__test__/pages/*.test  - the tests for pages
  - cannot put tests in the /pages dir or else NEXT will render them
  - moved compoents to /components so they would test nicely

