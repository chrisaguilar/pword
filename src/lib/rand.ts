import { randomBytes } from 'crypto';

// This is the function that generates the random hex bytes used throughout
//   the program. It uses crypto.randomBytes to create random bytes of a
//   given length.
// Here, the specified length is divided by two (because when the bytes are
//   converted to hex, they take up twice as many characters as needed),
//   rounded down (to ensure that crypto.randomBytes receives an integer),
//   and then passed through Math.abs, to make sure that crypto.randomBytes
//   receives a positive number.
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
