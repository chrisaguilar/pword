import { close, open } from '.';
import { b, green, r, red } from '../lib/formatters';

export const rename = async function rename(from: string, to: string): Promise<string> {
  try {

    const store = await open();

    if (!store.has(from)) return `${b}${red}${from} not present in store${r}`;

    store.set(to, store.get(from));
    store.delete(from);
    await close(store);

    return `Renamed ${b}${green}${from}${r} to ${b}${green}${to}${r}`;

  } catch (e) {
    throw e;
  }
};
