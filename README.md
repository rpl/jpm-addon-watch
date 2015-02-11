JPM Addon Watch
===============

**jpm-addon-watch** is a small wrapper around [jpm](http://github.com/mozilla/jpm) and
[jpm-addon](http://github.com/Gozala/jpm-addon) which mount your addon and livereload
your addon when a watched file (your addon's **package.json** file by default) changes.

## Install

Installing from npm:

```
npm install rpl/jpm-addon-watch -g
```

Then the new executable (**jpm-addon-watch**) will be available to you.

## Usage

`jpm-addon-watch` has only one command (**run**) which supports most of the **jpm** options (which will be used by the wrapped **jpm** under the hood) and a couple of new one:

- **run [addon_path]**: the path of the addon to mount and watch for changes (defaults to the current working dir)
- **--watch-file <path>**: the absolute file path to be watched (which defaults to your addon's **package.json** file)
- **--watch-interval**: the watch interval in milliseconds (which defaults to your addon)

### Examples

Mount and Watch the current addon with Firefox Nightly on OSX:

```
jpm-addon-watch run -b /Applications/FirefoxNightly.app
```

Mount and Watch a specified addon path (with Firefox Nightly on OSX):

```
jpm-addon-watch run -b /Applications/FirefoxNightly.app /path/to/myaddon
```

Force addon reload by updating mtime on the watched file:

```
touch /path/to/myaddon/package.json
```
