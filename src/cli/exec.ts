import { add, del, edit, find, get, newpass, rename } from '../store';
import { help } from './help';
import { parse } from './parse';

const { version } = require('../../package.json');

const decide = function decide (thing: string|string[]): string {
  if (typeof thing === 'string') return thing;
  for (const i of thing) console.log(i);
  return '';
};

export const exec = async function exec(): Promise<void> {
  try {

    const [ opt, ...args ] = parse(process.argv.slice(2).join(' '));
    return console.log(`${
      opt === 'a' ? await add(args[0], args[1])             :
      opt === 'd' ? await del(args[0])                      :
      opt === 'e' ? await edit(args[0], args[1])            :
      opt === 'f' ? decide(await find(args[0]))             :
      opt === 'g' ? await get(args[0])                      :
      opt === 'h' ? help()                                  :
      opt === 'i' ? 'Importing Not Implemented'             :
      opt === 'n' ? await newpass(+args[0] || 20, args[1])  :
      opt === 'r' ? await rename(args[0], args[1])          :
      opt === 'v' ? version                                 :
      opt === 'x' ? 'Exporting Not Implemented'
                  : help()
    }`);

  } catch (e) {
    return console.error(e) as any;
  }
};
