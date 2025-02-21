import { sum } from "../sum"

test('We will be checking the  sum function', () => {
  const result = sum(3,5);
  //Assertion
  expect(result).toBe(8);
})

