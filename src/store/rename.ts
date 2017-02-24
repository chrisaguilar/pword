import * as s from '.';
import { b, green, r, red } from '../lib/formatters';

interface Rename {
  (from: string, to: string): Promise<string>;
}

export const rename: Rename = async function (from, to) {
  try {

    const store: Map<{}, {}> = await s.open();

    if (!store.has(from)) return `${b}${red}${from} not present in store${r}`;

    store.set(to, store.get(from));
    store.delete(from);
    await s.close(store);

    return `Renamed ${b}${green}${from}${r} to ${b}${green}${to}${r}`;

  } catch (e) {
    return console.error(e) as any;
  }
};
