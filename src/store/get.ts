import { open } from '.';
import { b, green, r, red } from '../lib/formatters';

export const get = async function get(name: string): Promise<string> {
  try {

    const store = await open();

    if (!store.has(name)) return `${b}${red}${name} does not exist in store${r}`;

    const password = store.get(name) as string;

    return `${b}${green}${name}${r}: ${password}`;

  } catch (e) {
    throw e;
  }
};
