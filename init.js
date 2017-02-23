#!/usr/bin/env node

(async () => {
  try {
    require('ts-node').register({
      cacheDirectory: require('path').resolve(__dirname, '.tsnode_cache/'),
      disableWarnings: true,
      fast: true,
      ignore: false,
      lazy: true
    });
    await require('./src/lib').init();
  } catch (e) {
    return console.error(e);
  }
})();
