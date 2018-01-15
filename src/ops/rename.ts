import { open, write } from '~pword/store';

/**
 * Renames a password
 */
export async function rename (oldName: string, newName: string): Promise<void> {
    try {
        const store: Map<string, string> = await open() as Map<string, string>;

        if (!store.has(oldName)) throw new Error(`${oldName} does not exist!`);
        if (store.has(newName)) throw new Error(`${newName} already exists!`);

        const password: string = store.get(oldName) as string;
        store.delete(oldName);
        store.set(newName, password);

        await write(store);

        console.log(`${oldName} changed to ${newName}`);
    } catch (e) {
        console.error(e);
    }
}
