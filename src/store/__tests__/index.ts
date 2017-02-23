import { remove as rm } from 'fs-promise';

import { check, create, storefile } from '..';
import { keyfile } from '../../key';

export const destroy = async function destroy(): Promise<boolean> {
  try {
    const storefileRemoved = !await rm(storefile);
    const keyfileRemoved = !await rm(keyfile);
    return storefileRemoved && keyfileRemoved;
  } catch (e) {
    return console.error(e) as any;
  }
};

export const initialize = async function initialize(): Promise<boolean> {
  try {
    const filesRemoved = !await destroy();
    const checked = !await check();
    const created = !await create();
    return filesRemoved && checked && created;
  } catch (e) {
    return console.error(e) as any;
  }
};
