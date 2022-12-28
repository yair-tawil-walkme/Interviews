const fetchUrl = require('fetch-promise')

const promise1 = fetchUrl(`https://catfact.ninja/fact`)
const promise2 = fetchUrl(`https://catfact.ninja/fact`)
const promise3 = fetchUrl(`https://catfact.ninja/fact`)
const promise4 = fetchUrl(`https://catfact.ninja/fact`)
Promise.all([promise1, promise2, promise3, promise4]).then((values) =>
  values.map(({ buf }) => console.log(buf.toString())),
)

//implement me
// function MyPromiseAll(promises) {}

// MyPromiseAll([promise1, promise2, promise3, promise4]).then((values) =>
//   values.map(({ buf }) => console.log(buf.toString()))
// );
