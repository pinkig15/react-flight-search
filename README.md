This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

Below you will find some information on how to perform common tasks.<br>
You can find the most recent version of this guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).


## Folder Structure

After creation, the flight search engine project looks like this:

```
flightSearchReact/
    README.md
    .gitignore
    .babelrc
    node_modules/
    package.json
    index.html
    webpack.config.js
        dist/
            app.bundle.css
            app.bundle.css.map
            app.bundle.js
            app.bundle.js.map
        public/
            favicon.ico
        src/
            asset/
                air.png
                airplane.jpg
                flightlistData.js
                ItemLogo.svg
            components/
                App.js
                CustSlider.js
                Flight.js
                Flightlist.js
            styles/
                scss/
                    index.scss
            App.css
            App.test.js
            index.css
            index.js
            logo.svg
```

## Installing Dependencies

To Install module and dependencies run (in project directory):

### `yarn`


## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br>
Opens [http://localhost:3000](http://localhost:8080) to view it in the browser.

The page will reload if you make edits.

### `yarn build`

Build the app, update the project hierarchy with the dist folder<br>
dist folder containers the compiled js and css files which are being included in the public template index.html.


### 'webpack'

webpack.config.js file is created which is responsible for bundling the js and css files.
before bundling the files the js and scss files are being compiled through webpack itself. 

### `css preprocessor: scss`

All styling is done in scss which is getting compiled through webpack's script

### `npm test`

(TODO:)
Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](#running-tests) for more information.


## Project Guide

This is the flight search engine based on React,
- User will have the left sided query panel
- User will have the right sided panel for displaying the flights available as per the query fired
- It have some checks as date validation in start and end dates, same origin-destination cities


## How it works

- It has index.js as main landing js file
- which renders the root where root contains the main base outer component which is App
- App is using multiple child components like Flightlist, flightlist is having flightas as required
- We are using props for passing the information
- using event handling for various type's user's interactions like Search button clicking based listing of flight, slider based listing of flights
- Showing other related informations as well as part of the the flight details