import { createCipher } from 'crypto';

import { key } from '../key';

const transform = function transform(str: string): Promise<string> {
  return new Promise<string>(async (resolve, reject) => {
    const cipher = createCipher('aes256', await key());
    const encrypted: string[] = [];

    cipher
      .on('data', (chunk: Buffer) => encrypted.push(chunk.toString('hex')))
      .on('end', () => resolve(encrypted.join('')))
      .on('error', (e: Error) => reject(e));

    cipher.write(str);
    cipher.end();
  });
};

export const encrypt = async function encrypt(store: Map<{}, {}>): Promise<string> {
  try {

    return await transform(JSON.stringify([ ...store.entries() ]));

  } catch (e) {
    return console.error(e) as any;
  }
};
