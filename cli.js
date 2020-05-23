#!/usr/bin/env node
'use strict';
const React = require('react');
const importJsx = require('import-jsx');
const {render} = require('ink');
const path =  require('path');
const meow = require('meow');

const ui = importJsx('./ui');

const cli = meow(`
	Usage
	  $ cli <basePath>

	Examples
	  $ cli ./foo
`);
render(React.createElement(ui, {basePath:path.resolve(process.cwd(),cli.input[0]||'.')}));
