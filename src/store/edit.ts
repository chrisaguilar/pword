import { b, green, r, red } from 'lib/formatters';
import * as s from 'store';

export const edit = async function edit(name: string, password: string) {
  try {
    const store = await s.open();
    if (!store.get(name)) return `${b}${red}${name} not in the store${r}`;
    store.set(name, password);
    await s.close(store);
    return `${b}${green}${name}${r} set to ${b}${green}${password}${r}`;
  } catch (e) {
    return console.error(e);
  }
};
