import { Cipher, createCipher } from 'crypto';

import * as k from '../key';

interface Transform {
  (str: string): Promise<string>;
}

const transform: Transform = function (str) {
  return new Promise(async (resolve, reject) => {
    const cipher: Cipher = createCipher('aes256', await k.open());
    const encrypted: string[] = [];

    cipher
      .on('data', (chunk: Buffer) => encrypted.push(chunk.toString('hex')))
      .on('end', () => resolve(encrypted.join('')))
      .on('error', (e: Error) => reject(e));

    cipher.write(str);
    cipher.end();
  });
};

interface Encrypt {
  (store: Map<{}, {}>): Promise<string>;
}

export const encrypt: Encrypt = async function (store) {
  try {

    return await transform(JSON.stringify([ ...store.entries() ]));

  } catch (e) {
    return console.error(e) as any;
  }
};
