import { homedir } from 'os';
import { join } from 'path';

/**
 * Location of password store.
 */
export const file: string = join(homedir(), '.pword');
