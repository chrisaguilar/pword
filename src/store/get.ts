import * as s from '.';
import { b, green, r, red } from '../lib/formatters';

interface Get {
  (name: string): Promise<string>;
}

export const get: Get = async function (name) {
  try {

    const store: Map<{}, {}> = await s.open();

    if (!store.has(name)) return `${b}${red}${name} does not exist in store${r}`;

    const password: string = store.get(name) as string;

    return `${b}${green}${name}${r}: ${password}`;

  } catch (e) {
    return console.error(e) as any;
  }
};
