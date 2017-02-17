import { readFile as read } from 'fs-promise';

import { check, create, decrypt, storefile } from '.';

export const open = async function open(): Promise<Map<{}, {}>> {
  try {

    !await check() && await create();

    return await decrypt(await read(storefile, 'hex'));

  } catch (e) {
    throw e;
  }
};
