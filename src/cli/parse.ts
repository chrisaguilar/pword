import * as minimist from 'minimist';

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
