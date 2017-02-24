import * as s from '.';
import { b, green, r, red } from '../lib/formatters';

interface Del {
  (name: string): Promise<string>;
}

export const del: Del = async function (name) {
  try {

    const store: Map<{}, {}> = await s.open();

    if (!store.has(name)) return `${b}${red}${name} not in the store${r}`;

    store.delete(name);
    await s.close(store);

    return `Deleted ${b}${green}${name}${r} from the store`;

  } catch (e) {
    return console.error(e) as any;
  }
};
