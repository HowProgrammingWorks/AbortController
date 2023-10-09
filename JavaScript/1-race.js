'use strict';

const main = async () => {
  const url = 'https://developer.mozilla.org/';
  const promise = fetch(url);
  let timer = null;
  const timeout = new Promise((resolve) => {
    timer = setTimeout(() => {
      resolve();
      timer = null;
    }, 1000);
  });
  const response = await Promise.race([promise, timeout]);
  if (timer) clearTimeout(timer);
  if (response) {
    console.log(`fetch ${url} status ${response.status}`);
  }
};

main();
