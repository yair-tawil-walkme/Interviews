type Item = { value: number; duration: string };

const createPromiseCallback = (value: number, timeout: number): Promise<Item> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve({ value, duration: `${timeout / 1000} sec` });
    }, timeout);
  });

const promiseCallback1 = () => createPromiseCallback(1, 3000);
const promiseCallback2 = () => createPromiseCallback(2, 4000);
const promiseCallback3 = () => createPromiseCallback(3, 2000);
const promiseCallback4 = () => createPromiseCallback(4, 1000);

async function _logPromiseDuration(promise: Promise<any>) {
  let dots = "..";

  const interval = setInterval(() => {
    dots += ".";
    process.stdout.write(`Awaiting ${dots}\r`);
  }, 1000);

  const now = Date.now();

  const value = await promise;

  const duration = Math.floor((Date.now() - now) / 1000);

  clearInterval(interval);

  console.table(value);
  console.table([{ value: "Promise all", duration: `${duration} sec` }]);
}

function promiseAll(promises: Array<() => Promise<Item>>) {
  return Promise.all(promises.map((promiseCallback) => promiseCallback()));
}

async function MyPromiseAll(
  promises: Array<() => Promise<Item>>,
): Promise<Array<Item>> {
  const results: Item[] = [];
  let checkIndex = 0;
  return new Promise((resolve, reject) => {
    promises.forEach((promise, index) => {
      promise().then(result => {
        results[index] = result;
        checkIndex++;
        if (checkIndex === promises.length) resolve(results);
      }).catch(error => {
        reject({ reason: error, index });
      })
    }
    )
  })
}
//   promises.forEach((promise) => {
//     promise().then(result => {
//       results.push(result);


//         }).catch(error => {
//       throw error;
//     })
//   )}
// });


async function run() {
  //comment
  // await _logPromiseDuration(
  //   promiseAll([
  //     promiseCallback1,
  //     promiseCallback2,
  //     promiseCallback3,
  //     promiseCallback4,
  //   ]),
  // );

  await _logPromiseDuration(MyPromiseAll([promiseCallback1, promiseCallback2, promiseCallback3, promiseCallback4]));
}

run();
