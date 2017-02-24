import * as s from '.';
import { rand } from '../lib';

interface Newpass {
  (length: number, name: string): Promise<string>;
}

export const newpass: Newpass = async function (length, name) {
  try {

    return await s.add(name, await rand(length));

  } catch (e) {
    return console.error(e) as any;
  }
};
