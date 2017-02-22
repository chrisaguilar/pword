import { exists, remove } from 'fs-promise';

import * as key from 'key';
import * as store from 'store';

export const init = async function init(): Promise<void> {
  try {
    if (!(await exists(key.file)) && !(await exists(store.file))) {
      // Neither exists
      await key.create();
      await store.create();
      return;
    } else if (!(await exists(key.file)) || !(await exists(store.file))) {
      // Only one exists
      await remove(key.file);
      await remove(store.file);
      return await init();
    } else {
      // Both exist
      return;
    }
  } catch (e) {
    return console.error(e);
  }
};
