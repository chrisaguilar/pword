import { open } from '~pword/store';

/**
 * Finds a password that matches the given RegEx.
 */
export async function find (regex: string | undefined): Promise<void> {
    try {
        const store: [string, string][] = [...(await open() as Map<string, string>)];

        store.forEach(([key, value]: [string, string]) => {
            if (regex !== undefined) {
                if (new RegExp(regex, 'gi').test(key)) {
                    console.log(`${key}: ${value}`);
                }
            } else {
                console.log(`${key}: ${value}`);
            }
        });

    } catch (e) {
        console.error(e);
    }
}
