import * as program from 'commander';

import { add, del, edit, find, generate, get, rename } from '~pword/ops';
import { verify } from '~pword/store';

/**
 * executes `pword`
 */
// tslint:disable-next-line:no-function-expression no-floating-promises
(async function main (): Promise<void> {
    try {
        /**
         * Meta
         */
        program
            // tslint:disable-next-line:no-require-imports
            .version(require('../package.json').version)
            .description('Simple, unsafe password manager');

        /**
         * Add
         */
        program
            .command('add <name> <value>')
            .description('Add a password')
            .action(await verify(add));

        /**
         * Delete
         */
        program
            .command('delete <name>')
            .description('Delete a password')
            .action(await verify(del));

        /**
         * Edit
         */
        program
            .command('edit <name> <new_password>')
            .description('Edit a password')
            .action(await verify(edit));

        /**
         * Find
         */
        program
            .command('find [RegEx]')
            .description('Find a password')
            .action(await verify(find));

        /**
         * Get
         */
        program
            .command('get <name>')
            .description('Get a password')
            .action(await verify(get));

        /**
         * New
         */
        program
            .command('new <name> [length]')
            .description('Generate a new random password of [length] characters (default: 20)')
            .action(await verify(generate));

        /**
         * Rename
         */
        program
            .command('rename <old_name> <new_name>')
            .description('Rename a password')
            .action(await verify(rename));

        /**
         * Parse program arguments
         */
        program.parse(process.argv);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
})();
