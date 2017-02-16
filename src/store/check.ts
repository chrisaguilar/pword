import { exists } from 'fs-promise';

import { storefile } from '.';

export const check = function check(): Promise<boolean> {
  try {
    return exists(storefile);
  } catch (e) {
    throw e;
  }
};
