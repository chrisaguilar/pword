import { close, open } from '.';

export const add = async function add(name: string, password: string): Promise<void> {
  try {
    const store = await open();
    store.set(name, password);
    return await close(store);
  } catch (e) {
    throw e;
  }
};
