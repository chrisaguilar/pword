import { ensureDir, exists, remove } from 'fs-promise';
import { homedir } from 'os';
import { resolve } from 'path';

import * as k from '../key';
import * as s from '../store';

interface Init {
  (): Promise<void>;
}

export const init: Init = async function() {
  try {
    await ensureDir(resolve(homedir(), '.pword'));
    if (!await exists(k.file) && !await exists(s.file)) {
      await k.create();
      await s.create();
      return;
    } else if (!await exists(k.file) || !await exists(s.file)) {
      await remove(k.file);
      await remove(s.file);
      return await init();
    } else {
      return;
    }
  } catch (e) {
    return console.error(e) as any;
  }
};
