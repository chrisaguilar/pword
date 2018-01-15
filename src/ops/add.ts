import { open, write } from '~pword/store';

/**
 * Add a password to the password store.
 */
export async function add (name: string, value: string): Promise<void> {
    try {
        const store: Map<string, string> = (await open() as Map<string, string>);

        if (store.has(name)) throw new Error('Password already exists!');

        store.set(name, value);

        await write(store);

        console.log(`${name} has been added to your passwords. It is set to ${value}.`);
    } catch (e) {
        console.error(e);
    }
}
