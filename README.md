# D3 for the Impatient

Examples and code for the book _D3 for the Impatient_ by Philipp K. Janert
(O'Reilly, 2019).

![D3 for the Impatient Book Cover](d3cover-small.png)

## Description

This repository contains the source code and other files necessary to run
the examples in the book. The repository also contains the code that was
used to generate the figures in the book.

## View Examples and Figures

You can view all examples and figures [here](https://janert.github.io/d3-for-the-impatient-examples/).


## Installation

To run the examples yourself (in order to play with and modify them), you
need to download the files in the `examples` directory. You will also need
to run a local web server to work with D3 and to run the examples.

To make running the examples as easy as possible, a version of the D3
library itself is included with the other files. All examples
have been verified to work with this version of the D3 library
(D3 Version 5.9.2, downloaded 15. Apr 2019).


### Downloading the Source Code

To download the examples, you may clone the repository:

```
git clone git://github.com/janert/d3-for-the-impatient.git
```

Alternatively, download all the files as zipped archive from:

```
https://github.com/janert/d3-for-the-impatient/archive/master.zip
```

(or using the green button in the top right corner of this page), then
unpack them using:

```
unzip d3-for-the-impatient-master.zip
```

Either way, the files necessary to run the examples are contained
in the `examples` subdirectory.


### Setting up a Web Server

To run the examples, you need to run a local web server. Several minimal
web servers can be run without further configuration from the command line;
many programming languages include ready-to-use web server modules as well.
(See https://gist.github.com/willurd/5720255 for an extensive list of
low-configuration web servers.)

Here are some examples of popular, lightweight web servers. By default,
they all serve files from the directory they were started from, hence
_change into the `examples` directory before starting the server_.

- The D3 website recommends _http-server_, which is a Node.js package. If you
  have the Node runtime and the _npm_ package manager installed, you can 
  install and run a web server using:
   ```
   npm install -g http-server
   http-server -p 8080
   ```

- Because they are part of its standard distribution, Python's web server
  modules are ubiquitious, but can be quite slow, even for development work:
  ```
  python -m http.server 8080               # Python 3
  python -m SimpleHTTPServer 8080          # Python 2
  ```

- The _busybox_ set of tools should be installed on all Debian-derived
  Linux distributions by default. Its built-in web server works well and
  is very fast:
  ```
  busybox httpd -p 8080
  ```

In all these examples, the server will be serving files from the directory
that it was started in and listen on port 8080. (Most of the servers allow
to specify a different directory on the command line; see the server-specific
documentation.) The files in the server directory will be available at
http://localhost:8080.

### Running the Examples

Once the web server is running, point a JavaScript enabled browser to
http://localhost:8080 or http://localhost:8080/index.html. The examples
are organized by chapter, with all examples and figures on one single
page per chapter. (The exception is Chapter 2, where there is a separate
set of files for each example.)


## Contributing

These files are intended to make it easier to learn D3, so feel free to
modify them for your own purposes as you wish. Let me know if you have
questions or suggestions.

- Jane Pong is maintaining a [version organized by
  example](https://github.com/officeofjane/d3-for-the-impatient-examples)
  (instead of by chapter).

- Giuseppe Verni has created an [npm-based
  installer](https://github.com/gverni/d3-for-the-impatient).


## Resources

- Catalog Page on O'Reilly: https://www.oreilly.com/library/view/d3-for-the/9781492046783/

- D3 Project: https://d3js.org/


## Author

Philipp K. Janert


