const timeoutPromise = (timeout) => new Promise((resolve) => {
    setTimeout(() => {
        resolve(`done after ${timeout / 1000}s`)
    }, timeout)
})

const promise1 = () => timeoutPromise(4000);
const promise2 = () => timeoutPromise(3000);
const promise3 = () => timeoutPromise(2000);
const promise4 = () => timeoutPromise(1000);

Promise.all([promise1(), promise2(), promise3(), promise4()]).then((value) => console.log(value))

//implement me
// function MyPromiseAll(promises) {}

// MyPromiseAll([promise1, promise2, promise3, promise4]).then((values) =>
//   values.map(({ buf }) => console.log(buf.toString()))
// );
