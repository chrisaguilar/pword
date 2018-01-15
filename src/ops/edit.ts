import { open, write } from '~pword/store';

/**
 * Edits a password
 */
export async function edit (name: string, newPassword: string): Promise<void> {
    try {
        const store: Map<string, string> = await open() as Map<string, string>;

        if (!store.has(name)) throw new Error(`${name} does not exist!`);

        const oldPassword: string = store.get(name) as string;

        store.set(name, newPassword);

        await write(store);

        console.log(`${name} has been changed from ${oldPassword} to ${newPassword}`);
    } catch (e) {
        console.error(e);
    }
}
