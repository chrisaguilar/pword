import { writeJSON } from 'fs-extra';

import { file } from '~pword/store';

/**
 * Writes the password store (a `Map` object) to `$HOME/.pword` as a `JSON.stringify`-ed [string, string][].
 */
export async function write (store: Map<string, string>): Promise<void> {
    try {
        await writeJSON(file, [...store]);
    } catch (e) {
        console.error(e);
    }
}
