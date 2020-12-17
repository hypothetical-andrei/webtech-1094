const genCheckPrime = () => {
  const cache = []
  const checkPrime = (n) => {
    const index = cache.findIndex(e => e.value === n)
    if (index !== -1) {
      console.log('from cache')
      if (cache[index].isPrime) {
        return true
      } else {
        return false
      }
    } else {
      for (let i = 2; i <= n ** 1/2; i++) {
        if (n % i === 0) {
          cache.push({
            value: n,
            isPrime: false
          })
          return false
        }
      }
      cache.push({
        value: n,
        isPrime: true
      })
      return true
    }
  }
  return checkPrime
}

const checkPrime = genCheckPrime()

const samples = [7, 17, 27, 7, 27]

for (const sample of samples) {
  console.log(`${sample} is ${checkPrime(sample) ? 'prime' : 'not prime'}`)
}