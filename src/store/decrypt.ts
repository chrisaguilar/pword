import { createDecipher } from 'crypto';

import { key } from '../key';

const transform = function transform(str: string): Promise<string> {
  return new Promise<string>(async (resolve, reject) => {
    const decipher = createDecipher('aes256', await key());
    const decrypted: string[] = [];

    decipher
      .on('data', (chunk: Buffer) => decrypted.push(chunk.toString('utf8')))
      .on('end', () => resolve(decrypted.join('')))
      .on('error', (e: Error) => reject(e));

    decipher.write(str, 'hex');
    decipher.end();
  });
};

export const decrypt = async function decrypt(store: string): Promise<Map<{}, {}>> {
  try {
    return new Map(JSON.parse(await transform(store)));
  } catch (e) {
    throw e;
  }
};
