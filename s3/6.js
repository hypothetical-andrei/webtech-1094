const sampleString = 'i found {0} at the {1}'

const sampleFormat = ['a cat', 'petstore']

const formatString = (input, format) => {
  let result = input
  for (let i = 0; i < format.length; i++) {
    result = result.replace('{' + i + '}', format[i])
  }
  return result
}

console.log(formatString(sampleString, sampleFormat))
// i found a cat at the petstore