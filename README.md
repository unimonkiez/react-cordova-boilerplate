[![Build Status](https://travis-ci.org/unimonkiez/react-cordova-boilerplate.svg)](https://travis-ci.org/unimonkiez/react-cordova-boilerplate)
[![Dependency Status](https://david-dm.org/unimonkiez/react-cordova-boilerplate.svg)](https://david-dm.org/unimonkiez/react-cordova-boilerplate)
[![devDependency Status](https://david-dm.org/unimonkiez/react-cordova-boilerplate/dev-status.svg)](https://david-dm.org/unimonkiez/react-cordova-boilerplate#info=devDependencies)
[![npm version](https://badge.fury.io/js/react-cordova-boilerplate.svg)](http://badge.fury.io/js/react-cordova-boilerplate)
# Redux DevTools TodoMVC example
## Demo - click the image to try it
[<img src="https://raw.githubusercontent.com/unimonkiez/react-cordova-boilerplate/gh-pages/resources/demo.jpg" width="300" />](http://unimonkiez.github.io/react-cordova-boilerplate/)

<img src="https://raw.githubusercontent.com/unimonkiez/react-cordova-boilerplate/gh-pages/resources/demo.gif" width="300" />

# Notice
##### This is a prerelease version (*2.0.0*) of the boilerplate supporting some new features and webpack 2.
As of right now some testing features are missing , please be patient and help out :smile:.
You can always use latest version [here (1.3.0)](https://github.com/unimonkiez/react-cordova-boilerplate/tree/6f8ef8bc9b36bdcfb1dd6749c60064bf87008e47).

## Why cordova  and React
Cordova is really simple to build cross platform mobile applications for any of your needs, this boilerplate provides a great starting point for your next react project, and can be used to maintain a website and mobile application from same source code (any maybe transitioning later to react-native)

## Features
* eslint
* Smart build using Webpack 2
  * ES6
  * React (jsx)
  * Server rendering for initial page
  * Style: Redium + SASS
* React router
* Testing
  * Mocha
  * jsdom (blazing fast testing on nodeJs)
  * Sinon
  * Chai
  * Coverage using nyc

## Installing
1. Install dependencies: ```npm i``` or ```yarn install```
2. Install global tools: ```npm install -g cordova```
3. Add your cordova platform by running ```cordova platform add %PLATFORM%``` (android and more)

## Usage
- ```npm run lint[:report]``` - runs linting against src folder and **fix some of the issues**, `report` option to generate html report to `./report.html`.
- ```npm run start[:prod]``` - starts a server, with react model replacement and devtools on `localhost:8080`, `prod` option to minify the build (same build eventually integrated with the cordova app).
- ```npm run build[:prod][:watch]``` - builds the project (single html file and single js file) as it does for development.
- ```npm run test[:watch][:coverage]``` - runs Mocha testing, outputs result to console, `watch` options to watch files and test again after file modification, `coverage` option to generate coverage reports to `./coverage` folder (`index.html` is a usuful one!).

## Build and run as application
As you do with any cordova application, ```cordova build android```, ```cordova run android``` and more.

cordova runs ```npm run build:prod``` before any cordova command (using hooks).

## Style practice
To style your html, simply inline style your DOM ([**here is why**](https://github.com/erikras/react-redux-universal-hot-example/blob/master/docs/InlineStyles.md)).

You can use [Radium](https://github.com/FormidableLabs/radium) (which is included) to easily add 'css like' event listeners to your components (like hover).

Sass/CSS is included to complete some of the missing features or already written style you want to use.
To use Sass/CSS simply import that file!

***custom-font.scss***

```
@font-face {
	font-family: 'custom-font';
	src:url('./custom-font.eot') format('embedded-opentype'),
		url('./custom-font.ttf') format('truetype'),
		url('./custom-font.woff') format('woff'),
		url('./custom-font.svg') format('svg');
	font-weight: normal;
	font-style: normal;
}
.customFont {
  font-family: 'custom-font';  
  &.customFontIcon {
    content: "\e600";
    &:hover {
      color: blue;
    }
  }
}
```

***ExampleComponent.jsx***

```
import React, { Component } from 'react';
import customFont from './custom-font.scss'

export default class ExampleComponent extends Component {
  render() {
    return (
      <div style={{backgroundColor: 'red'}}>
        Hello world!
        <span className={customFont.customFont + ' ' + customFont.customFontIcon}></span>
      </div>
      );
  }
}
```

Advantages:
* Complete styling ability to go with inline style.
* Easily use third party styles.
* No globals - import style files and use the class (minifies signature - example ```.a``` instead of ```.customFont```)

Sass style will be minified, bundled and included to the server rendered file.
