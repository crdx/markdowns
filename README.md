# markdowns

**markdowns** is a node.js application that watches and converts Markdown files into HTML files.

## Installation

You can install the package and its dependencies using `npm`.

### From the npm registry

    npm install -g markdowns

### From the current directory

    npm install -g

## Usage

    Usage: markdowns [-h] [-v] [-w] [-p] [-V] [-d] [-e EXTENSION] [-f] [-n ENCODING] [directory]

    Watches and converts Markdown files into HTML files.

    Positional arguments:
      directory             The directory to process or watch. Defaults to the current directory.

    Optional arguments:
      -h, --help            Show this help message and exit.
      -v, --version         Show program's version number and exit.
      -w, --watch           Watch the current directory for changes.
      -p, --process         Process all files in the current directory.
      -V, --verbose         Be verbose.
      -d, --debug           Show debugging output.
      -e EXTENSION, --extension EXTENSION
                            Set the file extension of Markdown files. Defaults to md.
      -f, --force           Ignore warnings.
      -n ENCODING, --encoding ENCODING
                            Set the file encoding of the output files (ascii or utf8). Defaults to utf8.

If invoked with the `-p` or `--process` argument, **markdowns** will perform a one-time pass over the Markdown files in the directory, converting each one to HTML.

If invoked with the `-w` or `--watch` argument, **markdowns** will continuously watch all the Markdown files in the directory for changes, and convert any in which a change is detected.

The output files will have the same name as the original files but with `html` as the file extension.

**Note**: It would not be unreasonable to supply both `-p` and `-w` at the same time if you wanted to both process a directory and then watch it.

The default Markdown file extension is `md`, but this can be overridden with the `-e` or `--extension` argument.

## Dependencies

* [node.js](https://github.com/joyent/node)
* [marked](https://github.com/chjj/marked) ~0.2.5
* [argparse](https://github.com/nodeca/argparse) ~0.1.7

## Bugs or contributions

Open an [issue](http://github.com/crdx/markdowns/issues) or send a [pull request](http://github.com/crdx/markdowns/pulls).

## Licence

[MIT](LICENCE.md).
