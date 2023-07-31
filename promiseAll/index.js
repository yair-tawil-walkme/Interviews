const createPromiseCallback = (value, timeout) => new Promise((resolve) => {
    setTimeout(() => {
        resolve({ value, duration: `${timeout / 1000} sec` })
    }, timeout)
});

const promiseCallback1 = () => createPromiseCallback(1, 3000);
const promiseCallback2 = () => createPromiseCallback(2, 4000);
const promiseCallback3 = () => createPromiseCallback(3, 2000);
const promiseCallback4 = () => createPromiseCallback(4, 1000);

async function _logPromiseDuration(promise) {
    let dots = '..'

    const interval = setInterval(() => {
        dots += '.'
        process.stdout.write(`Awaiting ${dots}\r`);
    }, 1000);

    const now = Date.now();

    const value = await promise

    const  duration = Math.floor((Date.now() - now) / 1000);

    clearInterval(interval);

    console.table(value)
    console.table([{ value: 'Promise all', duration: `${duration} sec` }])
}

function promiseAll(promises) {
    return Promise.all(promises.map((promiseCallback) => promiseCallback()))
}

function MyPromiseAll(promises) {
    return new Promise((resolve, reject) => {
        let counter = 0;
        let resultArray = []
        promises.map(((promise, index) => {
            promise().then(result => {
                resultArray[index] = result
                counter += 1
                if (counter === promises.length) {
                    resolve(resultArray)
                }
            }).catch(e => {
                reject(e)
            })
        }))
    })
}

async function run() {
    // comment
    // await _logPromiseDuration(promiseAll([promiseCallback1, promiseCallback2, promiseCallback3, promiseCallback4]));

    // uncomment
    await _logPromiseDuration(MyPromiseAll([promiseCallback1, promiseCallback2, promiseCallback3, promiseCallback4]));
}

run();
