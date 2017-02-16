import { destroy, initialize } from '.';
import { add, close, open } from '..';

describe('store -> add', () => {
  beforeAll(async () => await initialize());
  afterAll(async () => await destroy());

  test('saves new password to store', async () => {
    const store = await open();

    store.set('gmail', 'abc123');
    await close(store);
    expect(await open()).toEqual(store);

    await add('facebook', '123abc');
    store.set('facebook', '123abc');
    expect(await open()).toEqual(store);
  });
});
