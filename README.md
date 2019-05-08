# Purpose of this fork

The purpose of this fork is ([as stated in the original one](https://github.com/janert/d3-for-the-impatient#contributing)) to provide an `npm` / `yarn` based installer to run a webserver for the book examples. 

Also, I'm planning to maintain and extend the example code, so any contribution to this repository is more than welcome.

# How to use it 

## tl;dr (for those who are familiar with node.js echosystem)

```
npm start
```

## Pre-requisites

This fork uses Node.js to run the webserver. In order to make use of all the features of this fork, Node.js and `npm` need to be preinstalled. Refer to the [Node.js website](https://nodejs.org/en/) for instructions to install node on your own operating system. 

## Clone repository(using git)

Use the following command (from your OS command line): 

```
git clone https://github.com/gverni/d3-for-the-impatient.git
```

## Install dependencies

Once you have cloned the repository, `cd` into the repo folder and run: 

```
npm install
```

This will install all the dependencies.

## Run web server (and file sync)

From the repo folder execute: 

```
npm start
```

This will: 
* Start a webserver on port 3000 serving files from the `examples` folder
* Start an instance of your default browser pointing to the index page 
* Initiate file sync, so everytime a file is changed in the `examples` folder, the browser automatically reloads it
