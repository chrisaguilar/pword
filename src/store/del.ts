import { close, open } from '.';
import { formatters } from '../lib';
const { b, green, r, red } = formatters;

export const del = async function del(name: string): Promise<string> {
  try {

    const store = await open();

    if (!store.get(name)) return `${b}${red}${name} not in the store${r}`;

    store.delete(name);
    await close(store);

    return `Deleted ${b}${green}${name}${r} from the store`;

  } catch (e) {
    throw e;
  }
};
