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
  const url = 'https://developer.mozilla.org/';
  const promise = fetch(url);
  const response = await timeoutify(promise, 100);
  console.log(`fetch ${url} status ${response.status}`);
};

main();
