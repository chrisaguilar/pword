import { remove } from 'fs-extra';

import * as k from 'key';
import { init } from 'lib';
import * as s from 'store';

export const before = async function before() {
  try {
    await remove(k.file);
    await remove(s.file);
    await init();
  } catch (e) {
    return console.error(e);
  }
};

export const after = async function after() {
  try {
    await remove(k.file);
    await remove(s.file);
  } catch (e) {
    return console.error(e);
  }
};
