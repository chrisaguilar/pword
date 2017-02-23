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
    require('./src/cli').exec();
  } catch (e) {
    return console.error(e);
  }
})();

