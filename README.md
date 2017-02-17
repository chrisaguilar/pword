# @chrisaguilar/pword

### Why?

Because I wanted to. I thought it would be fun to make, so I made it, and it
*was* fun to make. :)

### Installation

`$ npm install -g @chrisaguilar/pword`

OR

`$ yarn global add @chrisaguilar/pword`

### Usage

```
$ pword <option> <args>

-h, --help                          Print this screen
-v, --version                       Print the version number
-a, --add <name> <password>         Save a new password
-d, --delete <name>                 Delete a password
-e, --edit <name> <new_password>    Give <name> a new password
-f, --find <RegEx>                  Find passwords
-g, --get <name>                    Get a password
-n, --new [length] <name>           Generate a new password of [length]
                                    characters (Default: 20)
-r, --rename <from> <to>            Rename a password
```

### Examples

```
$ pword -a gmail g_pass     Save gmail as g_pass
$ pword -n 50 wikipedia     Generate 50 random alphanumeric characters and save
                            it as wikipedia
$ pword --find i            Find all password that contain an i (here, gmail &
                            wikipedia)
```

### License

MIT License

Copyright (c) 2017 Christopher M. Aguilar

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
