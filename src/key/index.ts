import { randomBytes } from 'crypto';
import { check } from './check';
import { create } from './create';
import { keyfile } from './location';
import { open } from './open';

export { check, create, open, keyfile };

export const key = async function key() {
  try {
    !await check() && await create();
    return await open();
  } catch (e) {
    return console.error(e);
  }
};

export const rand = function rand(): Promise<Buffer> {
  return new Promise<Buffer>((resolve, reject) =>
    randomBytes(50, (err, buf) => err ? reject(err) : resolve(buf))
  );
};
