import { writeFile as write } from 'fs-promise';

import { encrypt, storefile } from '.';

export const create = async function create(): Promise<boolean> {
  try {

    return !!write(storefile, await encrypt(new Map()), 'hex');

  } catch (e) {
    throw e;
  }
};
