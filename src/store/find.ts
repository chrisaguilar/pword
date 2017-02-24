import * as s from '.';
import { b, green, r, red } from '../lib/formatters';

interface Find {
  (term: string): Promise<string | string[]>;
}

export const find: Find = async function (term) {
  try {

    const store: Map<{}, {}> = await s.open();
    const re: RegExp = new RegExp(term, 'i');
    const matches: any[][] = [ ...store.entries() ].filter(([ a, b ]) => re.test(a as string));

    if (matches.length === 0)
      return `${b}${red}No matches found for ${term}${r}`;

    return matches.map(([ x, y ]) => `${b}${green}${x}${r}: ${y}`);

  } catch (e) {
    return console.error(e) as any;
  }
};
