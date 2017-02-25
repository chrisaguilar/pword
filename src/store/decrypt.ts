import { createDecipher, Decipher } from 'crypto';

import * as k from '../key';

interface Transform {
  (str: string): Promise<string>;
}

const transform: Transform = function (str) {
  return new Promise(async (resolve, reject) => {
    const decipher: Decipher = createDecipher('aes256', await k.open());
    const decrypted: string[] = [];

    decipher
      .on('data', (chunk: Buffer) => decrypted.push(chunk.toString('utf8')))
      .on('end', () => resolve(decrypted.join('')))
      .on('error', (e: Error) => reject(e));

    decipher.write(str, 'hex');
    decipher.end();
  });
};

interface Decrypt {
  (store: string, tries?: number): Promise<Map<{}, {}>>;
}

export const decrypt: Decrypt = async function (store, tries = 0) {
  try {

    if (tries === 10)
      return console.error(
        'The key or store are broken, sorry about that.\n',
        'I\'m in the process of trying to make this never happen, bear with me.'
      );

    return new Map(JSON.parse(await transform(store)));

  } catch (e) {
    console.error('Error trying to decrypt the store, trying again.');
    return await decrypt(store, ++tries) as any;
  }
};
