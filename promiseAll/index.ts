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

function MyPromiseAll(
  promises: Array<() => Promise<Item>>
): Promise<Array<Item>> {
  return new Promise(async (resolve, reject) => {
    const results: Item[] = [];
    let completed: number = 0;

    for (let i = 0; i < promises.length; i++) {
      try {
        const result = await Promise.resolve(promises[i]());
        results[i] = result;
        completed++;
        if (promises.length == completed) {
          resolve(results);
        }
      } catch (e) {
        reject(e);
      }
    }

    // promises.forEach((promise, index) => {
    //   Promise.resolve(promise())
    //     .then((result) => {
    //       results[index] = result;
    //       completed++;

    //       if (promises.length == completed) {
    //         resolve(results);
    //       }
    //     })
    //     .catch(reject);
    // });
  });
}

async function run() {
  // comment
  // await _logPromiseDuration(
  //   promiseAll([
  //     promiseCallback1,
  //     promiseCallback2,
  //     promiseCallback3,
  //     promiseCallback4,
  //   ])
  // );

  // uncomment
  await _logPromiseDuration(
    MyPromiseAll([
      promiseCallback1,
      promiseCallback2,
      promiseCallback3,
      promiseCallback4,
    ])
  );
}

run();
