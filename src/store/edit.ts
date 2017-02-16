import { close, open } from '.';

export const edit = async function edit(name: string, password: string): Promise<void> {
  try {
    const store = await open();
    store.set(name, password);
    await close(store);
  } catch (e) {
    throw e;
  }
};
