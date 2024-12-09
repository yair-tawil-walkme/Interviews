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

function sleep(timeout: number) {
  // your code here
  return new Promise <void>((reslove,reject)=>{
    setTimeout(reslove,timeout);
  })
}

async function run() {
  // uncomment this:
   await _logPromiseDuration(sleep(5000));
}

run();
