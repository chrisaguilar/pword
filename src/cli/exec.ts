import * as s from '../store';
import { help } from './help';
import { parse } from './parse';

const { version } = require('../../package.json');

interface Decide {
  (thing: string|string[]): string;
}

const decide: Decide = function (thing) {
  if (typeof thing === 'string') return thing;
  for (const i of thing) console.log(i);
  return '';
};


interface Exec {
  (): Promise<void>;
}

export const exec: Exec = async function() {
  try {
    const [ opt, ...args ] = parse(process.argv.slice(2).join(' '));
    return console.log(`${
      opt === 'a' ? await s.add(args[0], args[1])        :
      opt === 'd' ? await s.del(args[0])                 :
      opt === 'e' ? await s.edit(args[0], args[1])       :
      opt === 'f' ? decide(await s.find(args[0]))        :
      opt === 'g' ? await s.get(args[0])                 :
      opt === 'h' ? help()                               :
      opt === 'i' ? 'Importing Not Implemented'          :
      opt === 'n' ? await s.new(+args[0] || 20, args[1]) :
      opt === 'r' ? await s.rename(args[0], args[1])     :
      opt === 'v' ? version                              :
      opt === 'x' ? 'Exporting Not Implemented'
                  : help()
    }`);
  } catch (e) {
    return console.error(e) as any;
  }
};
