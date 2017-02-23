import { createCipher, createDecipher } from 'crypto';
import { readFile, writeFile } from 'fs-promise';
import { resolve } from 'path';

import * as k from 'key';
import { b, green, r, rand, red } from 'lib';

export const file = resolve(__dirname, '../store');

const enc = function enc(str: string) {
  return new Promise<string>(async (resolve, reject) => {
    const cipher = createCipher('aes256', await k.get());
    const encrypted: string[] = [];

    cipher
      .on('data', (chunk: Buffer) => encrypted.push(chunk.toString('hex')))
      .on('end', () => resolve(encrypted.join('')))
      .on('error', (e: Error) => reject(e));

    cipher.write(str);
    cipher.end();
  });
};

export const encrypt = async function encrypt(store: Map<{}, {}>) {
  try {
    return await enc(JSON.stringify([ ...store.entries() ]));
  } catch (e) {
    return console.error(e);
  }
};

const dec = function dec(str: string) {
  return new Promise<string>(async (resolve, reject) => {
    const decipher = createDecipher('aes256', await k.get());
    const decrypted: string[] = [];

    decipher
      .on('data', (chunk: Buffer) => decrypted.push(chunk.toString('utf8')))
      .on('end', () => resolve(decrypted.join('')))
      .on('error', (e: Error) => reject(e));

    decipher.write(str, 'hex');
    decipher.end();
  });
};

export const decrypt = async function decrypt(store: string) {
  try {
    return new Map(JSON.parse(await dec(store)));
  } catch (e) {
    return console.error(e);
  }
};

export const open = async function open() {
  try {
    return await decrypt(await readFile(file, 'hex'));
  } catch (e) {
    return console.error(e);
  }
};

export const close = async function close(store: any) {
  try {
    return await writeFile(file, (await encrypt(store) as string), 'hex');
  } catch (e) {
    return console.error(e);
  }
};

export const create = async function create() {
  try {
    return writeFile(file, (await encrypt(new Map()) as string), 'hex');
  } catch (e) {
    return console.error(e);
  }
};

export const add = async function add(name: string, password: string) {
  try {
    const store = await open();
    if (store.get(name))
      return `${b}${red}${name} already present in store${r}`;
    store.set(name, password);
    await close(store);
    return `${b}${green}${name}${r} set to ${b}${green}${password}${r}`;
  } catch (e) {
    return console.error(e);
  }
};

export const del = async function del(name: string) {
  try {
    const store = await open();
    if (!store.get(name)) return `${b}${red}${name} not in the store${r}`;
    store.delete(name);
    await close(store);
    return `Deleted ${b}${green}${name}${r} from the store`;
  } catch (e) {
    return console.error(e);
  }
};

export const rename = async function rename(from: string, to: string) {
  try {
    const store = await open();
    if (!store.has(from)) return `${b}${red}${from} not present in store${r}`;
    store.set(to, store.get(from));
    store.delete(from);
    await close(store);
    return `Renamed ${b}${green}${from}${r} to ${b}${green}${to}${r}`;
  } catch (e) {
    return console.error(e);
  }
};

const newpass = async function newpass(length: number, name: string) {
  try {
    return await add(name, await rand(length));
  } catch (e) {
    return console.error(e);
  }
};

export { newpass as new };

export const get = async function get(name: string) {
  try {
    const store = await open();
    if (!store.has(name)) return `${b}${red}${name} does not exist in store${r}`;
    const password = store.get(name);
    return `${b}${green}${name}${r}: ${password}`;
  } catch (e) {
    return console.error(e);
  }
};

export const find = async function find(term: string) {
  try {
    const store = await open();
    const re: RegExp = new RegExp(term, 'i');
    const matches = [ ...store.entries() ].filter(([ a, b ]) => re.test(a as string));
    if (matches.length === 0)
      return `${b}${red}No matches found for ${term}${r}`;
    return matches.map(([ x, y ]) => `${b}${green}${x}${r}: ${y}`);
  } catch (e) {
    return console.error(e);
  }
};

export const edit = async function edit(name: string, password: string) {
  try {
    const store = await open();
    if (!store.get(name)) return `${b}${red}${name} not in the store${r}`;
    store.set(name, password);
    await close(store);
    return `${b}${green}${name}${r} set to ${b}${green}${password}${r}`;
  } catch (e) {
    return console.error(e);
  }
};
