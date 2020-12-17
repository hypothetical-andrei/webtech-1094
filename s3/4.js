const sampleString = 'the quick brown,fox jumps over the lazy dog'

const getFrequencies = (input) => {
  let words = input.split(/[\s,]/)
  let result = {}
  for (const word of words) {
    if (word in result) {
      result[word]++
    } else {
      result[word] = 1
    }
  }
  for (const word in result) {
    result[word] /= words.length
  }
  return result
}

console.log(getFrequencies(sampleString))
