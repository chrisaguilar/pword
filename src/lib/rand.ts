import { randomBytes } from 'crypto';

export const rand = function rand(length: number): Promise<string> {
  return new Promise<string>((resolve, reject) =>
    randomBytes(
      Math.floor(length / 2),
      (err, buf) => err ? reject(err) : resolve(buf.toString('hex'))
    )
  );
};
