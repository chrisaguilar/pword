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
  (store: string): Promise<Map<{}, {}>>;
}

export const decrypt: Decrypt = async function (store) {
  try {

    return new Map(JSON.parse(await transform(store)));

  } catch (e) {
    return console.error(e) as any;
  }
};
