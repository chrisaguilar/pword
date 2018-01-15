import * as randomstring from 'randomstring';

import { open, write } from '~pword/store';

/**
 * Generates a new password with a given length.
 */
export async function generate (name: string, length: string = '20'): Promise<void> {
    try {
        const store: Map<string, string> = await open() as Map<string, string>;

        if (store.has(name)) throw new Error(`${name} already exists!`);

        const password: string = randomstring.generate(parseInt(length, 10));

        store.set(name, password);

        await write(store);

        console.log(`A password for ${name} has been generated with length ${length}. It is set to ${password}`)
    } catch (e) {
        console.error(e);
    }
}
