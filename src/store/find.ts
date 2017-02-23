import { open } from '.';
import { b, green, r, red } from '../lib/formatters';

export const find = async function find(term: string): Promise<string|string[]> {
  try {

    const store: Map<{}, {}> = await open();
    const re: RegExp = new RegExp(term, 'i');
    const matches = [ ...store.entries() ].filter(([ a, b ]) => re.test(a as string));

    if (matches.length === 0)
      return `${b}${red}No matches found for ${term}${r}`;

    return matches.map(([ x, y ]) => `${b}${green}${x}${r}: ${y}`);

  } catch (e) {
    throw e;
  }
};
