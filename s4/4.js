const genCheckPrime = () => {
  const cache = []
  const checkPrime = (n) => {
    if (cache.indexOf(n) !== -1) {
      console.log('from cache')
      return true
    } else {
      for (let i = 2; i <= n ** 1/2; i++) {
        if (n % i === 0) {
          return false
        }
      }
      cache.push(n)
      return true
    }
  }
  return checkPrime
}

const checkPrime = genCheckPrime()

console.log(checkPrime(7))
console.log(checkPrime(17))
console.log(checkPrime(7))