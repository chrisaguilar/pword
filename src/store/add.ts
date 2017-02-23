import { close, open } from '.';
import { b, green, r, red } from '../lib/formatters';

export const add = async function add(name: string, password: string): Promise<string> {
  try {

    const store = await open();

    if (store.get(name))
      return `${b}${red}${name} already present in store${r}`;

    store.set(name, password);
    await close(store);

    return `${b}${green}${name}${r} set to ${b}${green}${password}${r}`;

  } catch (e) {
    throw e;
  }
};
