import { randomBytes } from 'crypto';

// This is the function that generates the random hex bytes used throughout
//   the program. It uses crypto.randomBytes to create random bytes of a
//   given length.
// Here, the absolute value of the given length is divided by two, and then
//   rounded down, in order to pass crypto.randomBytes a valid length.
// The function returns a promise that resolves with the hex string, or
//   rejects with the error, if any
export const rand = function rand(length: number): Promise<string> {
  const { abs, floor } = Math;
  return new Promise<string>((resolve, reject) => {
    return randomBytes(floor(abs(length) / 2), (err, buf) => {
      return err ? reject(err) : resolve(buf.toString('hex'));
    });
  });
};
