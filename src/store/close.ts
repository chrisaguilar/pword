import { writeFile as write } from 'fs-promise';

import { encrypt, storefile } from '.';

export const close = async function close(store: Map<{}, {}>): Promise<void> {
  try {

    return await write(storefile, await encrypt(store), 'hex');

  } catch (e) {
    return console.error(e) as any;
  }
};
