import { readFile as read } from 'fs-promise';

import { keyfile } from '.';

export const open = function open(): Promise<string> {
  return read(keyfile, 'hex');
};
