import { readFile } from 'fs-promise';

import * as k from '.';

interface Open {
  (): Promise<string>;
}

export const open: Open = function() {
  return readFile(k.file, 'hex');
};
