const fib = (index) => {
  switch (index) {
    case 0:
    case 1:
      return 1
    default:
      return fib(index - 1) + fib(index - 2)
  }
}

if (process.argv.length < 3) {
  console.log('usage: node 2.js <fibonacci index>')
} else {
  let index = parseInt(process.argv[2])
  if (isNaN(index)) {
    console.log('index must be an integer')
  } else {
    console.log(fib(index))
  }
}