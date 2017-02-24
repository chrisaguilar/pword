import { homedir } from 'os';
import { resolve } from 'path';

export const file: string = resolve(homedir(), '.pword/key');
