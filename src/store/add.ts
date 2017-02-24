import * as s from '.';
import { b, green, r, red } from '../lib/formatters';

interface Add {
  (name: string, password: string): Promise<string>;
}

export const add: Add = async function (name, password) {
  try {

    const store: Map<{}, {}> = await s.open();

    if (store.has(name))
      return `${b}${red}${name} already present in store${r}`;

    store.set(name, password);
    await s.close(store);

    return `${b}${green}${name}${r} set to ${b}${green}${password}${r}`;

  } catch (e) {
    return console.error(e) as any;
  }
};
