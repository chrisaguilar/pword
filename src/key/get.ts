import { readFile } from 'fs-promise';

import { file } from 'key';

// This function retrieves the key from <projectRoot>/key
// It returns a promise that should resolve with <projectRoot>/key being
//   read as a hex string, since the file is written as a hex string.
export const get = function get(): Promise<string> {
  return readFile(file, 'hex');
};
