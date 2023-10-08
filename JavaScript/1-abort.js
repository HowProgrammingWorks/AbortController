'use strict';

const main = async () => {
  const controller = new AbortController();
  const { signal } = controller;
  const timer = setTimeout(() => {
    controller.abort();
  }, 1000);
  const url = 'https://developer.mozilla.org/';
  const response = await fetch(url, { signal });
  clearTimeout(timer);
  console.log(`fetch ${url} status ${response.status}`);
};

main();
