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
  (store: Map<{}, {}>, tries?: number): Promise<string>;
}

export const encrypt: Encrypt = async function (store, tries = 0) {
  try {

    if (tries === 10)
      return console.error(
        'The key or store are broken, sorry about that.\n',
        'I\'m in the process of trying to make this never happen, bear with me.'
      );

    return await transform(JSON.stringify([ ...store.entries() ]));

  } catch (e) {
    console.error('Error trying to encrypt the store, trying again.');
    return await encrypt(store, ++tries) as any;
  }
};
