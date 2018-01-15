import { ensureFile, readJSON, writeJSON } from 'fs-extra';

import { file } from '~pword/store';

/**
 * Ensures that the password store exists before performing operations.
 */
export async function verify (fn: (...args: any[]) => void): Promise<(...args: any[]) => void> {
    try {
        await ensureFile(file);
        await readJSON(file);

        return fn;
    } catch (e) {
        await writeJSON(file, [...new Map()]);

        return verify(fn);
    }
}
