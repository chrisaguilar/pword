import { add } from '.';
import { rand } from '../lib/rand';

export const newpass = async function newpass(length: number, name: string) {
  try {

    return await add(name, await rand(length));

  } catch (e) {
    throw e;
  }
};
