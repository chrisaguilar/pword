import { createDecipher } from 'crypto';

import { get as getKey } from '../key';

const transform = function transform(str: string) {
  return new Promise<string>(async (resolve, reject) => {
    const decipher = createDecipher('aes256', await getKey());
    const decrypted: string[] = [];

    decipher
      .on('data', (chunk: Buffer) => decrypted.push(chunk.toString('utf8')))
      .on('end', () => resolve(decrypted.join('')))
      .on('error', (e: Error) => reject(e));

    decipher.write(str, 'hex');
    decipher.end();
  });
};

export const decrypt = async function decrypt(store: string): Promise<Map<{}, {}>|void> {
  try {
    return new Map(JSON.parse(await transform(store)));
  } catch (e) {
    return console.error(e);
  }
};
