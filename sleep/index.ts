async function _logPromiseDuration(promise: Promise<void>) {
  console.log("\n\n");

  let dots = "";

  const interval = setInterval(() => {
    dots += "😴";
    process.stdout.write(`Sleeping ${dots}\r`);
  }, 1000);

  const now = Date.now();

  await promise;

  const duration = (Date.now() - now) / 1000;

  clearInterval(interval);

  console.log("\x1b[33m%s\x1b[0m", `duration: ${duration} seconds`);
}

function sleep(timeout: number): Promise<void> {
  const setTime = new Promise<void>((resolve, reject) => {
    setTimeout(resolve, 5000);
  });
  return setTime;
}

async function run() {
  await _logPromiseDuration(sleep(5000));
}

run();
