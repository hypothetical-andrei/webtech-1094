let a = [1,2,3,4,5]

console.log('with classic for')
for (let i = 0; i < a.length; i++) {
  if (a[i] > 3) {
    console.log(a[i])
  }
}

console.log('with for..of')
for (let elem of a) {
  if (elem > 3) {
    console.log(elem)
  }
}

console.log('with array.forEach')
a.forEach(e => {
  if (e > 3) {
    console.log(e)
  }
})

console.log('with array.filter')
let a1 = a.filter(e => e > 3)
console.log(a1)

let o = {
  name: 'some name',
  age: 111
}

for (let key in o) {
  console.log(o[key]) 
}

console.log(Object.keys(o))