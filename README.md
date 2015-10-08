[![Build Status](https://travis-ci.org/unimonkiez/react-cordova-boilerplate.svg)](https://travis-ci.org/yuvalsaraf/react-cordova-boilerplate)
[![Dependency Status](https://david-dm.org/unimonkiez/react-cordova-boilerplate.svg)](https://david-dm.org/yuvalsaraf/react-cordova-boilerplate)
[![devDependency Status](https://david-dm.org/unimonkiez/react-cordova-boilerplate/dev-status.svg)](https://david-dm.org/yuvalsaraf/react-cordova-boilerplate#info=devDependencies)
[![npm version](https://badge.fury.io/js/react-cordova-boilerplate.svg)](http://badge.fury.io/js/react-cordova-boilerplate)
# Redux DevTools TodoMVC example
![](http://s16.postimg.org/hje88sfkl/Screenshot_2015_09_14_18_04_50_1.png)

![](http://s23.postimg.org/tmgzg652j/2015_10_06_17_22_52_1_online_video_cutter.gif)

## Why cordova
Cordova is really simple to build cross platform mobile applications for any of your needs, this boilerplate provides a great starting point for your next project, as it uses:
* Cordova
* ES6
* React
* React router
* Webpack
* Server rendering
* Karma
* Eslint
* Style: Redium + SASS

## Installing
1. Install dependencies: ```npm i```
2. Install global tools: ```npm install -g cordova```
3. Add your cordova platform by running ```cordova platform add %PLATFORM%``` (android and more)

## Usage
- ```npm run lint``` - runs linting against src folder.
- ```npm run test``` - runs karma + jasmine testing.
- ```npm run start``` - starts a server, with react model replacement and devtools.
- ```npm run start:prod``` - starts a server, with react model replacement and minifications of main html file and js file.
- ```npm run build``` - builds the project (single html file and single js file) as it does for development.
- ```npm run build:prod``` - builds the project (single html file and single js file) as it does for production.

## Build and run as application
As you do with any cordova application, ```cordova build android```, ```cordova run android``` and more.

cordova runs ```npm run build:prod``` before any cordova command (using hooks).

## Style practice
To style your html, simply inline style your DOM ([**here is why**](https://github.com/erikras/react-redux-universal-hot-example/blob/master/docs/InlineStyles.md)).

You can use [Radium](https://github.com/FormidableLabs/radium) (which is included) to easily add 'css like' event listeners to your components (like hover).

Sass is included to complete some of the missing features that inline styles can't add like:
* Fonts.
* Animations (though transitions are possible and easy!).
* third party css (like bootsrap?).
* Possibly more I didn't came across.

To use Sass simply import that file!

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
* No globals - when including the style to the needed place when can minify the classes much further (like ```.a``` instead of ```.customFont```).

Sass style will be minified, bundled and included to the server rendered file.
