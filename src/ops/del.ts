import { open, write } from '~pword/store';

/**
 * Deletes a password from the password store.
 */
export async function del (name: string): Promise<void> {
    try {
        const store: Map<string, string> = (await open() as Map<string, string>);

        if (!store.has(name)) throw new Error(`${name} doesn't exist!`);

        store.delete(name);

        await write(store);

        console.log(`${name} has been removed from your passwords.`);
    } catch (e) {
        console.error(e);
    }
}
