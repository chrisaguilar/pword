import { exists } from 'fs-promise';

import { keyfile } from '.';

export const check = function check(): Promise<boolean> {
  return exists(keyfile);
};
