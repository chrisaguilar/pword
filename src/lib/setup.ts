import { remove } from 'fs-promise';

import { init } from '.';
import * as k from '../key';
import * as s from '../store';

interface Before {
  (): Promise<void>;
}

export const before: Before = async function() {
  try {
    await remove(k.file);
    await remove(s.file);
    await init();
    return;
  } catch (e) {
    return console.error(e) as any;
  }
};

interface After {
  (): Promise<void>;
}

export const after: After = async function() {
  try {
    await remove(k.file);
    await remove(s.file);
  } catch (e) {
    return console.error(e) as any;
  }
};
