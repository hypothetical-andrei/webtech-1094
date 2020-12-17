const sampleArray = [1,2,3,4,5,6]

const samplePredicate = (x) => x > 3

const filter = (a, p) => {
  let result = []
  for (const element of a) {
    if (p(element)) {
      result.push(element)
    }
  }
  return result
}

console.log(filter(sampleArray, samplePredicate))
console.log(filter(['cat', 'dog', 'bear', 'elephant'], (e) => e.length > 3 ))