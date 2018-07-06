/**
 * _.fromPairs([['a', 1], ['b', 2]]);
  // => { 'a': 1, 'b': 2 }
 */
export function fromPairs(pairs) {
  const result = {}
  if (pairs == null) {
    return result
  }
  for (const pair of pairs) {
    result[pair[0]] = pair[1]
  }
  return result
}
