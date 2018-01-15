# @chrisaguilar/pword

## Why?

Because I wanted to. I thought it would be fun to make, so I made it, and it
*was* fun to make. :)

## Installation

`$ npm install -g @chrisaguilar/pword`

OR

`$ yarn global add @chrisaguilar/pword`

OR

`$ npx @chrisaguilar/pword`

## Usage

```
$ pword --help

Usage: index [options] [command]

Simple, unsafe password manager


Options:

  -V, --version  output the version number
  -h, --help     output usage information


Commands:

  add <name> <value>            Add a password
  delete <name>                 Delete a password
  edit <name> <new_password>    Edit a password
  find [RegEx]                  Find a password
  get <name>                    Get a password
  new <name> [length]           Generate a new random password of [length] characters (default: 20)
  rename <old_name> <new_name>  Rename a password
```

## Examples

```
$ pword add gmail g_pass      Save gmail as g_pass
$ pword new wikipedia 50      Generate a new, 50-character long password for wikipedia
$ pword find i                Find all passwords that contain an i (here, gmail & wikipedia)
```

## License

MIT License

Copyright (c) 2018 Christopher M. Aguilar

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
