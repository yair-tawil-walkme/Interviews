type PromiseCallback = { value: number; duration: string };

const createPromiseCallback = (
  value: number,
  timeout: number
): Promise<PromiseCallback> =>
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

function promiseAll(promises: Array<() => Promise<PromiseCallback>>) {
  return Promise.all(promises.map((promiseCallback) => promiseCallback()));
}

function MyPromiseAll(promises: Array<() => Promise<PromiseCallback>>) {
  return new Promise((resolve, reject) => {
    if (promises.length) {
      resolve([]);
    }

    const completed: PromiseCallback[] = [];
    let count = 0;
    for (let i = 0; i < promises.length; i++) {
      const current = promises[i];
      current()
        .then((res): void => {
          count += 1;
          completed[i] = res;
          if (count === promises.length) {
            resolve(completed);
          }
        })
        .catch((err) => {
          reject(err);
        });
    }
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
  //   ]),
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
