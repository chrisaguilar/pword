import { randomBytes } from 'crypto';
import { exists, remove } from 'fs-promise';

import * as k from 'key';
import * as s from 'store';

export const b: string = '\x1B[1m';
export const cols: number = Math.min((process as any).stdout.columns - 4, 80);
export const green: string = '\x1b[32m';
export const hr: string = '-'.repeat(cols);
export const r: string = '\x1B[0m';
export const red: string = '\x1B[31m';

export const rand = function rand(length: number) {
  const { abs, floor } = Math;
  return new Promise<string>((resolve, reject) => {
    return randomBytes(floor(abs(length) / 2), (err, buf) => {
      return err ? reject(err) : resolve(buf.toString('hex'));
    });
  });
};

export const init = async function init(): Promise<void> {
  try {
    if (!(await exists(k.file)) && !(await exists(s.file))) {
      await k.create();
      await s.create();
      return;
    } else if (!(await exists(k.file)) || !(await exists(s.file))) {
      await remove(k.file);
      await remove(s.file);
      return await init();
    } else {
      return;
    }
  } catch (e) {
    return console.error(e);
  }
};
