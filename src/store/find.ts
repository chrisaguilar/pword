import { open } from '.';

export const find = async function find(term: string): Promise<Array<[{}, {}]>> {
  try {
    const store: Map<{}, {}> = await open();
    const re: RegExp = new RegExp(term, 'i');
    return [ ...store.entries() ].filter(([ a, b ]) => re.test(a as string));
  } catch (e) {
    throw e;
  }
};
