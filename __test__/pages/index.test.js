// CURRENTLY NOT MOCKING THE API
// MUST RUN dev in order to pass
import next from 'next'
next({});

import { Wordlist } from '../../components/Gameboard/Classes/Wordlist';

import {getStaticProps, staticFetcher} from '../../pages/index'
import {BASE_URL} from '../../next.config';

describe('env loads in jest', ()=>{
  expect(process.env.NODE_ENV).toEqual('test')
  expect(BASE_URL).toEqual('http://localhost:3000')
})

describe("index.js - the home page", ()=>{
  console.log(`getStaticProps`)

  describe('staticFetcher', ()=>{
    it('should return a new Wordlist object', async()=>{
      const result = await staticFetcher()
      expect(result).toBeDefined()
      expect(result.length).toBeGreaterThan(0)
      expect( result instanceof Wordlist ).toBe(true)
    })
  })
  
  describe('getStaticProps', ()=>{
    it('should return a props object', async ()=>{
      const result = await getStaticProps({})
      expect(result).toBeDefined()
    })
    it('Should have a fallback key with a Wordlist Object', async ()=>{
      const result = await getStaticProps({})
      expect(
        result.props.fallback['/api/wordlist'] instanceof Wordlist
      ).toBe(true)
    })
  })
})