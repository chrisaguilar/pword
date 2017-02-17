import { destroy, initialize } from '.';
import { add, close, open } from '..';
import { formatters } from '../../lib';
const { b, green, r, red } = formatters;

describe('store -> add', () => {
  beforeAll(async () => await initialize());
  afterAll(async () => await destroy());

  test('saves new password to store', async () => {
    const store = await open();

    store.set('gmail', 'abc123');
    await close(store);
    expect(await open()).toEqual(store);

    const added = await add('facebook', '123abc');
    store.set('facebook', '123abc');
    expect(await open()).toEqual(store);

    expect(added).toEqual(`${b}${green}facebook${r} set to ${b}${green}123abc${r}`);
  });

  test('rejects names already present', async () => {
    const store = await open();

    store.set('gmail', 'abc123');
    await close(store);
    expect(await open()).toEqual(store);

    const rejected = await add('gmail', '123abc');
    store.set('gmail', '123abc');
    expect(await open()).not.toEqual(store);
    expect(rejected).toEqual(`${b}${red}gmail already present in store${r}`);
  });
});
