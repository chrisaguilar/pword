import { open } from '.';

export const get = async function get(name: string): Promise<string> {
  try {
    const store = await open();
    return store.get(name) as string;
  } catch (e) {
    throw e;
  }
};
