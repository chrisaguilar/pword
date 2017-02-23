import * as minimist from 'minimist';

import { b, r } from 'lib';
import * as s from 'store';

const { version } = require('../package.json');

export const help = function help (): string {
  return `
  ${ b }Usage: pword <option> <args>${ r }

  -h, --help                          Print this screen
  -v, --version                       Print the version number
  -a, --add <name> <password>         Save a new password
  -d, --delete <name>                 Delete a password
  -e, --edit <name> <new_password>    Give <name> a new password
  -f, --find <RegEx>                  Find passwords
  -g, --get <name>                    Get a password
  -n, --new [length] <name>           Generate a new password of [length] characters (Default: 20)
  -r, --rename <from> <to>            Rename a password
`;
};
// FUTURE
// -i, --import <keyfile> <store>      Import a previously created database
// -x, --export [p|j|e] <destination>  Export key/store in (p)laintext, (j)son, or (e)ncrypted form (Default: e);

export const parse = function parse (input: string): string[] {
  const args: any = minimist(input.split(' '), {
    alias: {
      a: 'add', d: 'delete', e: 'edit', f: 'find', g: 'get', h: 'help',
      i: 'import', n: 'new', r: 'rename', v: 'version', x: 'export'
    }
  });
  const { a, d, e, f, g, h, i, n, r, v, x, _ }: any = args;

  const isBool   = (val: any): boolean => typeof val === 'boolean';
  const isString = (val: any): boolean => typeof val === 'string';

  const oneFlag: boolean = Object.keys(args).length - 2 === 1;
  const oneArg:  boolean = _.length === 1;
  const noArgs:  boolean = _.length === 0;

  return (
    !oneFlag                     ?  [ 'h' ]                 :
    a && oneArg && isString (a)  ?  [ 'a', a, _[ 0 ] ]      :
    d && noArgs && isString (d)  ?  [ 'd', d ]              :
    e && oneArg && isString (e)  ?  [ 'e', e, _[ 0 ] ]      :
    f && noArgs && isString (f)  ?  [ 'f', f ]              :
    g && noArgs && isString (g)  ?  [ 'g', g ]              :
    h && noArgs && isBool   (h)  ?  [ 'h' ]                 :
    i && oneArg && isString (i)  ?  [ 'i', i, _[ 0 ] ]      :
    n && noArgs && isString (n)  ?  [ 'n', `20`, n ]        :
    n && oneArg && !isNaN   (n)  ?  [ 'n', `${n}`, _[ 0 ] ] :
    r && oneArg && isString (r)  ?  [ 'r', r, _[ 0 ] ]      :
    v && noArgs && isBool   (v)  ?  [ 'v' ]                 :
    x && noArgs && isString (x)  ?  [ 'x', x ]              :
    x && oneArg && isString (x)  ?  [ 'x', x, _[ 0 ] ]
                                 :  [ 'h' ]
  );
};

const decide = function decide (thing: string|string[]): string {
  if (typeof thing === 'string') return thing;
  for (const i of thing) console.log(i);
  return '';
};

export const exec = async function exec(): Promise<void> {
  try {
    const [ opt, ...args ] = parse(process.argv.slice(2).join(' '));
    return console.log(`${
      opt === 'a' ? await s.add(args[0], args[1])             :
      opt === 'd' ? await s.del(args[0])                      :
      opt === 'e' ? await s.edit(args[0], args[1])            :
      opt === 'f' ? decide(await s.find(args[0]) as string)   :
      opt === 'g' ? await s.get(args[0])                      :
      opt === 'h' ? help()                                  :
      opt === 'i' ? 'Importing Not Implemented'               :
      opt === 'n' ? await s.new(+args[0] || 20, args[1])      :
      opt === 'r' ? await s.rename(args[0], args[1])          :
      opt === 'v' ? version                                   :
      opt === 'x' ? 'Exporting Not Implemented'
                  : help()
    }`);
  } catch (e) {
    return console.error(e);
  }
};
