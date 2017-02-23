import { b, green, r, red } from 'lib/formatters';
import * as s from 'store';

export const get = async function get(name: string) {
  try {
    const store = await s.open();
    if (!store.has(name)) return `${b}${red}${name} does not exist in store${r}`;
    const password = store.get(name);
    return `${b}${green}${name}${r}: ${password}`;
  } catch (e) {
    return console.error(e);
  }
};
