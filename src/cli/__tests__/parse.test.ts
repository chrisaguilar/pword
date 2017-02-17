import { parse } from '../parse';

describe('parse', () => {
  describe('# of flags', () => {
    test('the user passes 0 flags', () => {
      expect(parse('')).toEqual([ 'h' ]);
    });

    test('the user passes 1 flag', () => {
      expect(parse('--new someService')).toEqual([ 'n', 'someService' ]);
      expect(parse('-s gmail abc')).toEqual([ 's', 'gmail', 'abc' ]);
      expect(parse('--version')).toEqual([ 'v' ]);
      expect(parse('-h')).toEqual([ 'h' ]);
    });

    test('the user passes >1 flags', () => {
      expect(parse('--get mail --delete mail')).toEqual([ 'h' ]);
      expect(parse('--import db --export .')).toEqual([ 'h' ]);
      expect(parse('-h -v')).toEqual([ 'h' ]);
      expect(parse('-v -s')).toEqual([ 'h' ]);
    });

    test('the user passes an unknown flag', () => {
      expect(parse('-z zebra')).toEqual([ 'h' ]);
      expect(parse('-w what')).toEqual([ 'h' ]);
    });
  });

  describe('delete <name>', () => {
    describe('the user passes -d or --delete', () => {
      test('the user provides 1 argument', () => {
        expect(parse('--delete gmail')).toEqual([ 'd', 'gmail' ]);
        expect(parse('-d gmail')).toEqual([ 'd', 'gmail' ]);
      });

      test('the user provides 0 arguments', () => {
        expect(parse('--delete')).toEqual([ 'h' ]);
        expect(parse('-d')).toEqual([ 'h' ]);
      });

      test('the user provides >1 argument', () => {
        expect(parse('--delete gmail facebook')).toEqual([ 'h' ]);
        expect(parse('-d gmail facebook')).toEqual([ 'h' ]);
      });
    });
  });

  describe('edit <name> <new_password>', () => {
    describe('the user passes -e or --edit', () => {
      test('the user provides 2 arguments', () => {
        expect(parse('--edit someservice newpass')).toEqual([ 'e', 'someservice', 'newpass' ]);
        expect(parse('-e someservice newpass')).toEqual([ 'e', 'someservice', 'newpass' ]);
      });

      test('the user provides <2 arguments', () => {
        expect(parse('--edit someservice')).toEqual([ 'h' ]);
        expect(parse('-e someservice')).toEqual([ 'h' ]);
      });

      test('the user provides >2 arguments', () => {
        expect(parse('--edit someservice newpass asdf')).toEqual([ 'h' ]);
        expect(parse('-e someservice newpass asdf')).toEqual([ 'h' ]);
      });
    });
  });

  describe('find <term>', () => {
    describe('the user provides -f or --find', () => {
      test('the user provides 1 argument', () => {
        expect(parse('--find gmail')).toEqual([ 'f', 'gmail' ]);
        expect(parse('-f gmail')).toEqual([ 'f', 'gmail' ]);
      });

      test('the user provides 0 arguments', () => {
        expect(parse('--find')).toEqual([ 'h' ]);
        expect(parse('-f')).toEqual([ 'h' ]);
      });

      test('the user provides >1 argument', () => {
        expect(parse('--find gmail facebook')).toEqual([ 'h' ]);
        expect(parse('-f gmail facebook')).toEqual([ 'h' ]);
      });
    });
  });

  describe('get <name>', () => {
    describe('the user passes -g or --get', () => {
      test('the user provides 1 argument', () => {
        expect(parse('--get mail')).toEqual([ 'g', 'mail' ]);
        expect(parse('-g mail')).toEqual([ 'g', 'mail' ]);
      });

      test('the user provides 0 arguments', () => {
        expect(parse('--get')).toEqual([ 'h' ]);
        expect(parse('-g')).toEqual([ 'h' ]);
      });

      test('the user provides >1 argument', () => {
        expect(parse('--get mail google')).toEqual([ 'h' ]);
        expect(parse('-g mail google')).toEqual([ 'h' ]);
      });
    });
  });

  describe('help', () => {
    describe('the user passes -h or --help', () => {
      test('the user provides 0 arguments', () => {
        expect(parse('--help')).toEqual([ 'h' ]);
        expect(parse('-h')).toEqual([ 'h' ]);
      });

      test('the user provides >0 arguments', () => {
        expect(parse('--help whatever')).toEqual([ 'h' ]);
        expect(parse('-h whatever')).toEqual([ 'h' ]);
      });
    });
  });

  describe('import <keyfile> <store>', () => {
    describe('the user passes -i or --import', () => {
      test('the user provides 2 arguments', () => {
        expect(parse('--import path/to/key path/to/store')).toEqual([ 'i', 'path/to/key', 'path/to/store' ]);
        expect(parse('-i path/to/key path/to/store')).toEqual([ 'i', 'path/to/key', 'path/to/store' ]);
      });

      test('the user provides <2 arguments', () => {
        expect(parse('--import path/to/somefile')).toEqual([ 'h' ]);
        expect(parse('-i path/to/somefile')).toEqual([ 'h' ]);
      });

      test('the user provides >2 arguments', () => {
        expect(parse('--import path/to/somefile path/to/anotherfile .')).toEqual([ 'h' ]);
        expect(parse('-i path/to/somefile path/to/anotherfile .')).toEqual([ 'h' ]);
      });
    });
  });

  describe('new [length] <name>', () => {
    describe('the user passes -n or --new', () => {
      test('the user provides 2 arguments', () => {
        expect(parse('--new 30 someservice')).toEqual([ 'n', '30', 'someservice' ]);
        expect(parse('-n 12 someservice')).toEqual([ 'n', '12', 'someservice' ]);
      });

      test('the user provides 1 argument', () => {
        expect(parse('--new someservice')).toEqual([ 'n', 'someservice' ]);
        expect(parse('-n someservice')).toEqual([ 'n', 'someservice' ]);
      });

      test('the user provides 0 arguments', () => {
        expect(parse('--new')).toEqual([ 'h' ]);
        expect(parse('-n')).toEqual([ 'h' ]);
      });

      test('the user provides >2 arguments', () => {
        expect(parse('--new 30 someservice abc')).toEqual([ 'h' ]);
        expect(parse('-n 12 someservice abc')).toEqual([ 'h' ]);
      });
    });
  });

  describe('rename <from> <to>', () => {
    describe('the user passes -r or --rename', () => {
      test('the user provides 2 arguments', () => {
        expect(parse('--rename someservice google')).toEqual([ 'r', 'someservice', 'google' ]);
        expect(parse('-r someservice google')).toEqual([ 'r', 'someservice', 'google' ]);
      });

      test('the user provides <2 arguments', () => {
        expect(parse('--rename someservice')).toEqual([ 'h' ]);
        expect(parse('-r someservice')).toEqual([ 'h' ]);
      });

      test('the user provides >2 arguments', () => {
        expect(parse('--rename someservice google fb')).toEqual([ 'h' ]);
        expect(parse('-r someservice google fb')).toEqual([ 'h' ]);
      });
    });
  });

  describe('save <name> <password>', () => {
    describe('the user passes -s or --save', () => {
      test('the user provides 2 arguments', () => {
        expect(parse('--save mail abc')).toEqual([ 's', 'mail', 'abc' ]);
        expect(parse('-s mail abc')).toEqual([ 's', 'mail', 'abc' ]);
      });

      test('the user provides <2 arguments', () => {
        expect(parse('--save facebook')).toEqual([ 'h' ]);
        expect(parse('-s mail')).toEqual([ 'h' ]);
      });

      test('the user provides >2 arguments', () => {
        expect(parse('--save facebook abc123 asdfjkl')).toEqual([ 'h' ]);
        expect(parse('-s google 123456 789fdsa')).toEqual([ 'h' ]);
      });
    });
  });

  describe('version', () => {
    describe('the user passes -v or --version', () => {
      test('the user provides 0 arguments', () => {
        expect(parse('--version')).toEqual([ 'v' ]);
        expect(parse('-v')).toEqual([ 'v' ]);
      });

      test('the user provides >0 arguments', () => {
        expect(parse('--version whatever')).toEqual([ 'h' ]);
        expect(parse('-v whatever')).toEqual([ 'h' ]);
      });
    });
  });

  describe('export [plaintext|json|encrypted] <destination>', () => {
    describe('the user passes -x or --export', () => {
      test('the user provides 2 arguments', () => {
        expect(parse('-x plaintext .')).toEqual([ 'x', 'plaintext', '.' ]);
        expect(parse('--export json .')).toEqual([ 'x', 'json', '.' ]);
      });

      test('the user provides 1 argument', () => {
        expect(parse('--export .')).toEqual([ 'x', '.' ]);
        expect(parse('-x .')).toEqual([ 'x', '.' ]);
      });

      test('the user provides 0 arguments', () => {
        expect(parse('--export')).toEqual([ 'h' ]);
        expect(parse('-x')).toEqual([ 'h' ]);
      });

      test('the user provides >2 arguments', () => {
        expect(parse('--export plaintext . whatevs')).toEqual([ 'h' ]);
        expect(parse('-x json . whatevs')).toEqual([ 'h' ]);
      });
    });
  });
});
