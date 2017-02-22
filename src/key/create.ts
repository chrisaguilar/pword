import { writeFile } from 'fs-promise';

import { file } from 'key';
import { rand } from 'lib/rand';

export const create = async function create(): Promise<void> {
  const { floor, random } = Math;
  try {
    const key: string = await rand(floor(random() * (100 - 25) + 25));
    return writeFile(file, key, 'hex');
  } catch (e) {
    return console.error('Error writing key file', e);
  }
};
