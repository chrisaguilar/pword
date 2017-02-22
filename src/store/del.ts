import { b, green, r, red } from 'lib/formatters';
import * as s from 'store';

export const del = async function del(name: string) {
  try {
    const store = await s.open();
    if (!store.get(name)) return `${b}${red}${name} not in the store${r}`;
    store.delete(name);
    await s.close(store);
    return `Deleted ${b}${green}${name}${r} from the store`;
  } catch (e) {
    return console.error(e);
  }
};
