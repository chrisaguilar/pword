import { b, r } from './formatters';

export const help = function help (): string {
  return `
  ${ b }Usage: pword <option> <args>${ r }

  -h, --help                          Print this screen
  -v, --version                       Print the version number
  -d, --delete <name>                 Delete a password
  -e, --edit <name> <new_password>    Give <name> a new password
  -f, --find <RegEx>                  Find passwords
  -g, --get <name>                    Get a password
  -i, --import <keyfile> <store>      Import a previously created database
  -n, --new [length] <name>           Generate a new password of [length] characters (Default: 20)
  -r, --rename <from> <to>            Rename a password
  -s, --save <name> <password>        Save a new password
  -x, --export [p|j|e] <destination>  Export key/store in (p)laintext, (j)son, or (e)ncrypted form (Default: e)
`;
};
