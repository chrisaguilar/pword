import { randomBytes } from 'crypto';

interface Rand {
  (length: number): Promise<string>;
}

export const rand: Rand = function(length) {
  return new Promise((resolve, reject) => {
    return randomBytes(Math.floor(Math.abs(length) / 2), (err, buf) => {
      return err ? reject(err) : resolve(buf.toString('hex'));
    });
  });
};
