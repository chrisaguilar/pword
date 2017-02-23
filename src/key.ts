import { readFile, writeFile } from 'fs-promise';
import { resolve } from 'path';

import { rand } from 'lib';

const file: string = resolve(__dirname, '../key');

const create = async function create() {
  const { floor, random } = Math;
  try {
    const key = await rand(floor(random() * (100 - 25) + 25));
    return writeFile(file, key, 'hex');
  } catch (e) {
    return console.error('Error writing key file', e);
  }
};

const get = function get() {
  return readFile(file, 'hex');
};


export { create, file, get };
