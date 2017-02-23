import { b, green, r, red } from 'lib/formatters';
import * as s from 'store';

export const find = async function find(term: string) {
  try {
    const store = await s.open();
    const re: RegExp = new RegExp(term, 'i');
    const matches = [ ...store.entries() ].filter(([ a, b ]) => re.test(a as string));
    if (matches.length === 0)
      return `${b}${red}No matches found for ${term}${r}`;
    return matches.map(([ x, y ]) => `${b}${green}${x}${r}: ${y}`);
  } catch (e) {
    return console.error(e);
  }
};
