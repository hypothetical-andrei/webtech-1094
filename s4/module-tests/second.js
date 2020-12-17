const state = require('./state')

const doStuff = () => {
  const value = state.getValue('somekey')
  console.log(`value was ${value}`)
}

module.exports = {
  doStuff
}