import { b, green, r, red } from 'lib/formatters';
import { close, open } from 'store';

export const add = async function add(name: string, password: string) {
  try {
    const store = await open();
    if (store.get(name))
      return `${b}${red}${name} already present in store${r}`;
    store.set(name, password);
    await close(store);
    return `${b}${green}${name}${r} set to ${b}${green}${password}${r}`;
  } catch (e) {
    return console.error(e);
  }
};
