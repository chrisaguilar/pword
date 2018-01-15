import { readJSON } from 'fs-extra';

import { file } from '~pword/store';

/**
 * Opens password store.
 */
export async function open (): Promise<Map<string, string> | void> {
    try {
        return new Map(await readJSON(file));
    } catch (e) {
        console.error(e);
    }
}
