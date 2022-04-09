import { Gameboard } from "./useGameboard";

describe.only("Gameboard Class", () => {
  test("instantiation should produced a new Gameboard", () => {
    const result = new Gameboard("hi");

    expect(result).toBeInstanceOf(Gameboard)
    console.log(`result: `, result.chars)
    expect(result.rows).toEqual(1)
    expect(result.slots).toEqual(2)
    expect(result.word).toEqual("hi")
    expect(result.activeChar).toEqual('row-0__slot-0')
    expect(result.chars.length).toEqual(2)
  });

  describe.only('Gameboard.getCharRow(row)', ()=>{
    it('should return a row of chars', ()=>{
      const gb = new Gameboard("hi");
      const result = gb.getCharRow(0)
      console.log("%%%", result)
      expect(typeof result).toEqual('object')
      expect(result.length).toEqual(2)
      expect(result[0].key).toEqual(`row-0__slot-0`)
      expect(result[1].key).toEqual(`row-0__slot-1`)
    })
  })
});
