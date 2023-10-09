'use strict';

const DEFAULT_TIMEOUT = 10000;

const fetchWithTimeout = async (url, options = {}) => {
  const { timeout = DEFAULT_TIMEOUT } = options;
  const controller = new AbortController();
  const timer = setTimeout(() => {
    controller.abort();
  }, timeout);
  const { signal } = controller;
  const response = await fetch(url, { ...options, signal });
  clearTimeout(timer);
  return response;
};

const main = async () => {
  const url = 'https://developer.mozilla.org/';
  const response = await fetchWithTimeout(url, { timeout: 5000 });
  console.log(`fetch ${url} status ${response.status}`);
};

main();
