'use strict';

const main = async () => {
  const signal = AbortSignal.timeout(1000);
  const url = 'https://developer.mozilla.org/';
  const response = await fetch(url, { signal });
  console.log(`fetch ${url} status ${response.status}`);
};

main();
