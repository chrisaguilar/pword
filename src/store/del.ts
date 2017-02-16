import { close, open } from '.';

export const del = async function del(name: string): Promise<void> {
  try {
    const store = await open();
    store.delete(name);
    return await close(store);
  } catch (e) {
    throw e;
  }
};
