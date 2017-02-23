import { close, open } from '.';
import { b, green, r, red } from '../lib/formatters';

export const del = async function del(name: string): Promise<string> {
  try {

    const store = await open();

    if (!store.get(name)) return `${b}${red}${name} not in the store${r}`;

    store.delete(name);
    await close(store);

    return `Deleted ${b}${green}${name}${r} from the store`;

  } catch (e) {
    return console.error(e) as any;
  }
};
