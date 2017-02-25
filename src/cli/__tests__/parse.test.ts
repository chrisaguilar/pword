import { expect } from 'chai';

import { parse } from '..';

describe('parse', () => {
  describe('# of flags', () => {
    it('the user passes 0 flags', () => {
      expect(parse('')).to.eql([ 'h' ]);
    });

    it('the user passes 1 flag', () => {
      expect(parse('--new someService')).to.eql([ 'n', '20', 'someService' ]);
      expect(parse('-a gmail abc')).to.eql([ 'a', 'gmail', 'abc' ]);
      expect(parse('--version')).to.eql([ 'v' ]);
      expect(parse('-h')).to.eql([ 'h' ]);
    });

    it('the user passes >1 flags', () => {
      expect(parse('--get mail --delete mail')).to.eql([ 'h' ]);
      expect(parse('--import db --export .')).to.eql([ 'h' ]);
      expect(parse('-h -v')).to.eql([ 'h' ]);
      expect(parse('-v -a')).to.eql([ 'h' ]);
    });

    it('the user passes an unknown flag', () => {
      expect(parse('-z zebra')).to.eql([ 'h' ]);
      expect(parse('-w what')).to.eql([ 'h' ]);
    });
  });

  describe('delete <name>', () => {
    describe('the user passes -d or --delete', () => {
      it('the user provides 1 argument', () => {
        expect(parse('--delete gmail')).to.eql([ 'd', 'gmail' ]);
        expect(parse('-d gmail')).to.eql([ 'd', 'gmail' ]);
      });

      it('the user provides 0 arguments', () => {
        expect(parse('--delete')).to.eql([ 'h' ]);
        expect(parse('-d')).to.eql([ 'h' ]);
      });

      it('the user provides >1 argument', () => {
        expect(parse('--delete gmail facebook')).to.eql([ 'h' ]);
        expect(parse('-d gmail facebook')).to.eql([ 'h' ]);
      });
    });
  });

  describe('edit <name> <new_password>', () => {
    describe('the user passes -e or --edit', () => {
      it('the user provides 2 arguments', () => {
        expect(parse('--edit someservice newpass')).to.eql([ 'e', 'someservice', 'newpass' ]);
        expect(parse('-e someservice newpass')).to.eql([ 'e', 'someservice', 'newpass' ]);
      });

      it('the user provides <2 arguments', () => {
        expect(parse('--edit someservice')).to.eql([ 'h' ]);
        expect(parse('-e someservice')).to.eql([ 'h' ]);
      });

      it('the user provides >2 arguments', () => {
        expect(parse('--edit someservice newpass asdf')).to.eql([ 'h' ]);
        expect(parse('-e someservice newpass asdf')).to.eql([ 'h' ]);
      });
    });
  });

  describe('find <term>', () => {
    describe('the user provides -f or --find', () => {
      it('the user provides 1 argument', () => {
        expect(parse('--find gmail')).to.eql([ 'f', 'gmail' ]);
        expect(parse('-f gmail')).to.eql([ 'f', 'gmail' ]);
      });

      it('the user provides 0 arguments', () => {
        expect(parse('--find')).to.eql([ 'h' ]);
        expect(parse('-f')).to.eql([ 'h' ]);
      });

      it('the user provides >1 argument', () => {
        expect(parse('--find gmail facebook')).to.eql([ 'h' ]);
        expect(parse('-f gmail facebook')).to.eql([ 'h' ]);
      });
    });
  });

  describe('get <name>', () => {
    describe('the user passes -g or --get', () => {
      it('the user provides 1 argument', () => {
        expect(parse('--get mail')).to.eql([ 'g', 'mail' ]);
        expect(parse('-g mail')).to.eql([ 'g', 'mail' ]);
      });

      it('the user provides 0 arguments', () => {
        expect(parse('--get')).to.eql([ 'h' ]);
        expect(parse('-g')).to.eql([ 'h' ]);
      });

      it('the user provides >1 argument', () => {
        expect(parse('--get mail google')).to.eql([ 'h' ]);
        expect(parse('-g mail google')).to.eql([ 'h' ]);
      });
    });
  });

  describe('help', () => {
    describe('the user passes -h or --help', () => {
      it('the user provides 0 arguments', () => {
        expect(parse('--help')).to.eql([ 'h' ]);
        expect(parse('-h')).to.eql([ 'h' ]);
      });

      it('the user provides >0 arguments', () => {
        expect(parse('--help whatever')).to.eql([ 'h' ]);
        expect(parse('-h whatever')).to.eql([ 'h' ]);
      });
    });
  });

  describe('import <keyfile> <store>', () => {
    describe('the user passes -i or --import', () => {
      it('the user provides 2 arguments', () => {
        expect(parse('--import path/to/key path/to/store')).to.eql([ 'i', 'path/to/key', 'path/to/store' ]);
        expect(parse('-i path/to/key path/to/store')).to.eql([ 'i', 'path/to/key', 'path/to/store' ]);
      });

      it('the user provides <2 arguments', () => {
        expect(parse('--import path/to/somefile')).to.eql([ 'h' ]);
        expect(parse('-i path/to/somefile')).to.eql([ 'h' ]);
      });

      it('the user provides >2 arguments', () => {
        expect(parse('--import path/to/somefile path/to/anotherfile .')).to.eql([ 'h' ]);
        expect(parse('-i path/to/somefile path/to/anotherfile .')).to.eql([ 'h' ]);
      });
    });
  });

  describe('new [length] <name>', () => {
    describe('the user passes -n or --new', () => {
      it('the user provides 2 arguments', () => {
        expect(parse('--new 30 someservice')).to.eql([ 'n', '30', 'someservice' ]);
        expect(parse('-n 12 someservice')).to.eql([ 'n', '12', 'someservice' ]);
      });

      it('the user provides 1 argument', () => {
        expect(parse('--new someservice')).to.eql([ 'n', '20', 'someservice' ]);
        expect(parse('-n someservice')).to.eql([ 'n', '20', 'someservice' ]);
      });

      it('the user provides 0 arguments', () => {
        expect(parse('--new')).to.eql([ 'h' ]);
        expect(parse('-n')).to.eql([ 'h' ]);
      });

      it('the user provides >2 arguments', () => {
        expect(parse('--new 30 someservice abc')).to.eql([ 'h' ]);
        expect(parse('-n 12 someservice abc')).to.eql([ 'h' ]);
      });
    });
  });

  describe('rename <from> <to>', () => {
    describe('the user passes -r or --rename', () => {
      it('the user provides 2 arguments', () => {
        expect(parse('--rename someservice google')).to.eql([ 'r', 'someservice', 'google' ]);
        expect(parse('-r someservice google')).to.eql([ 'r', 'someservice', 'google' ]);
      });

      it('the user provides <2 arguments', () => {
        expect(parse('--rename someservice')).to.eql([ 'h' ]);
        expect(parse('-r someservice')).to.eql([ 'h' ]);
      });

      it('the user provides >2 arguments', () => {
        expect(parse('--rename someservice google fb')).to.eql([ 'h' ]);
        expect(parse('-r someservice google fb')).to.eql([ 'h' ]);
      });
    });
  });

  describe('add <name> <password>', () => {
    describe('the user passes -a or --add', () => {
      it('the user provides 2 arguments', () => {
        expect(parse('--add mail abc')).to.eql([ 'a', 'mail', 'abc' ]);
        expect(parse('-a mail abc')).to.eql([ 'a', 'mail', 'abc' ]);
      });

      it('the user provides <2 arguments', () => {
        expect(parse('--add facebook')).to.eql([ 'h' ]);
        expect(parse('-a mail')).to.eql([ 'h' ]);
      });

      it('the user provides >2 arguments', () => {
        expect(parse('--add facebook abc123 asdfjkl')).to.eql([ 'h' ]);
        expect(parse('-a google 123456 789fdsa')).to.eql([ 'h' ]);
      });
    });
  });

  describe('version', () => {
    describe('the user passes -v or --version', () => {
      it('the user provides 0 arguments', () => {
        expect(parse('--version')).to.eql([ 'v' ]);
        expect(parse('-v')).to.eql([ 'v' ]);
      });

      it('the user provides >0 arguments', () => {
        expect(parse('--version whatever')).to.eql([ 'h' ]);
        expect(parse('-v whatever')).to.eql([ 'h' ]);
      });
    });
  });

  describe('export [plaintext|json|encrypted] <destination>', () => {
    describe('the user passes -x or --export', () => {
      it('the user provides 2 arguments', () => {
        expect(parse('-x plaintext .')).to.eql([ 'x', 'plaintext', '.' ]);
        expect(parse('--export json .')).to.eql([ 'x', 'json', '.' ]);
      });

      it('the user provides 1 argument', () => {
        expect(parse('--export .')).to.eql([ 'x', '.' ]);
        expect(parse('-x .')).to.eql([ 'x', '.' ]);
      });

      it('the user provides 0 arguments', () => {
        expect(parse('--export')).to.eql([ 'h' ]);
        expect(parse('-x')).to.eql([ 'h' ]);
      });

      it('the user provides >2 arguments', () => {
        expect(parse('--export plaintext . whatevs')).to.eql([ 'h' ]);
        expect(parse('-x json . whatevs')).to.eql([ 'h' ]);
      });
    });
  });
});
