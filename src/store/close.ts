import { writeFile } from 'fs-promise';

import { encrypt, file } from 'store';

export const close = async function close(store: any) {
  try {
    return await writeFile(file, (await encrypt(store) as string), 'hex');
  } catch (e) {
    return console.error(e);
  }
};
