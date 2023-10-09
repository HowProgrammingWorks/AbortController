'use strict';

const timeoutify = (promise, msec) =>
  new Promise((resolve, reject) => {
    let timer = setTimeout(() => {
      timer = null;
      reject(new Error(`Timeout of ${msec}ms reached`));
    }, msec);
    promise.then(
      (result) => {
        if (!timer) return;
        clearTimeout(timer);
        resolve(result);
      },
      (error) => {
        if (!timer) return;
        clearTimeout(timer);
        reject(error);
      },
    );
  });

const main = async () => {
  const promise = new Promise((resolve) => {
    process.on('SIGINT', resolve);
  });
  const response = await timeoutify(promise, 10000);
  console.log({ response });
};

main();
