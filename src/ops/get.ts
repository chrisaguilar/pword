import { open } from '~pword/store';

/**
 * Gets a single password.
 */
export async function get (name: string): Promise<void> {
    try {
        const store: Map<string, string> = await open() as Map<string, string>;

        if (!store.has(name)) throw new Error(`${name} does not exist!`);

        const password: string = store.get(name) as string;

        console.log(`${name}: ${password}`);
    } catch (e) {
        console.error(e);
    }
}
