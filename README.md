# D3 for the Impatient

Examples and code for the book _D3 for the Impatient_ by Philipp K. Janert
(O'Reilly, 2019).

## Description

This repository contains the source code and other files for the examples in
the book, as well as the code that was used to generate the book's figures.

To make it easy to run the examples, a version of the D3 library itself is
also included. The examples have been verified to work with this version of
the D3 library! (D3 Version 5.9.2, downloaded 15. Apr 2019.)


## Installation

To run the examples, download the files in the `examples` directory.
You will also need to run a local webserver to work with D3 and to
run the examples.

### Downloading the Source Code

TBD

### Setting up a Web Server

To run the examples, you need to run a local web server. Several minimal
webservers can be run without further configuration from the command
line languages include ready-to-use webserver modules as well.
(See https://gist.github.com/willurd/5720255 for an extensive list of
low-configuration web servers.) 

The D3 website recommends _http-server_, which is a Node.js package. If you
have the Node runtime and the _npm_ package manager installed, you can 
install and run a webserver using:

```
npm install -g http-server
http-server ./project -p 8080

Because they are part of its standard distribution, Python's webserver
modules are ubiquitious, but can be quite slow, even for development
work (the `-d` argument requires Python 3.7 or later):

```
python -m http.server -d ./project 8080	 # Python 3
python -m SimpleHTTPServer 8080          # Python 2: current dir

The _busybox_ set of tools should be installed on all Debian-derived
Linux distributions by default. Its built-in webserver works well and
is very fast:

```
busybox httpd -h ./project -p 8080

In all these examples (except Python 2), the server will be serving files
from the _project/_ directory below the current directory, and listen
on port 8080. The files in the server directory will be available at
http://localhost:8080.

### Running the Examples

Once the web server is running, point a JavaScript enabled browser to
http://localhost:8080 or http://localhost:8080/index.html. The examples
are organized by chapter, with all examples and figures on one single
page per chapter. (The exception is Chapter 2, where there is a separate
set of files for each example.)


## Resources

- Catalog Page on O'Reilly: http://shop.oreilly.com/product/0636920224341.do

- D3 Project: https://d3js.org/


## Author

Philipp K. Janert


