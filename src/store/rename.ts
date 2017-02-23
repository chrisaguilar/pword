import { b, green, r, red } from 'lib/formatters';
import * as s from 'store';

export const rename = async function rename(from: string, to: string) {
  try {
    const store = await s.open();
    if (!store.has(from)) return `${b}${red}${from} not present in store${r}`;
    store.set(to, store.get(from));
    store.delete(from);
    await s.close(store);
    return `Renamed ${b}${green}${from}${r} to ${b}${green}${to}${r}`;
  } catch (e) {
    return console.error(e);
  }
};
