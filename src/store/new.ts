import { rand } from 'lib/rand';
import * as s from 'store';

export const newpass = async function newpass(length: number, name: string) {
  try {
    return await s.add(name, await rand(length));
  } catch (e) {
    return console.error(e);
  }
};
