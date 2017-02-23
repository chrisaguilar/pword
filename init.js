#!/usr/bin/env node

require('ts-node').register({
  cacheDirectory: require('path').resolve(__dirname, '.tsnode_cache/'),
  disableWarnings: true,
  fast: true,
  ignore: false,
  lazy: true
});
require('lib/init').init();
