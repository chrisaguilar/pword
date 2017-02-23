import { exists } from 'fs-promise';

import { storefile } from '.';

export const check = function check(): Promise<boolean> {
  try {

    return exists(storefile);

  } catch (e) {
    return console.error(e) as any;
  }
};
