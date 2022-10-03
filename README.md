![Build](https://github.com/DevoInc/App-Widgets/actions/workflows/Build.yml/badge.svg)
![Publish](https://github.com/DevoInc/App-Widgets/actions/workflows/Publish.yml/badge.svg)

[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](CODE_OF_CONDUCT.md)

# Devo App Widgets

Devo App Widgets is a library that contains the building blocks to start building visual widgets on Devo Apps.

## Live demo 🌈

You can explore this library and interact with widgets directly by using in the following link:

https://devoinc.github.io/App-Widgets/demo

---

## What is a Devo App?

A Devo App is a front-end web browser extension capable of being injected and hosted into the Devo web platform as well as communicating with it and with the collection of HTTP services enabled for Devo customers.

## Before starting

As a main requirement for the development of applications in Devo it is necessary to have access to the platform and a domain.

Once you have access, to prepare the development environment you must install the google chrome extension "Devo Runner", you will find it [here](https://chrome.google.com/webstore/detail/devo-runner/apjjdfhcegcemhdhaeadkddbjhgfplmo). This extension will help the developer to be able to debug and develop their application by providing a mechanism to inject it into an existing Devo client domain.

---

## Instalation

Start by installing this package in your NPM project

```npm
$ npm install @devoinc/app-widgets
```

## Usage

There are 5 widgets available at the moment:

```
ApexColumn
ApexDonut
ApexPie
SimpleMap
SingleValue
```

You can visit our [Storybook website](https://devoinc.github.io/App-Widgets/demo) to watch them in action.

## Documentation

For specific question regarding how to use these Widgets, refer to each module in the documentation.

https://devoinc.github.io/App-Widgets/

---

## Development

### 1. Getting started

You need to have [Node.js](https://nodejs.org/en/), [v16.15.1](https://nodejs.org/download/release/v16.15.1/), to develop on this library.

In case you have `nvm` installed, you can just run the following command. There is an `.nvmrc` file with specific node.js version.

```sh
nvm use
```

In order to install what is necessary and to start the project, please follow these simple steps:

```sh
# Clone this repository:
git clone git@github.com:DevoInc/App-Widgets.git

# Go into the repository:
cd App-Widgets

# Install dependencies:
npm ci

# Run the development environment (storybook):
npm run start

# Build for production:
npm run build
```

### 2. Develop locally using Storybook

```sh
# Run in development and serve directly:
npm run start

or

npm run storybook

# Just build, and open separately:
npm run storybook:build
```

### 3. Develop locally using an example app

In case you want to test this library locally (without publish), you need to build the library, create a package, and use it directly as a dependency on your local application.

```sh
# Build package:
npm run build

# Package it locally (without publish):
npm pack
```

Then, you need to import this dependency package on your local app (package.json):

```sh
{ # App's package.json

   # Rest of App's package.json
   ...

   "dependencies": {
       "@devoinc/app-widgets": "file:../App-Widgets/devoinc-app-widgets-*.tgz",
       # Rest of dependencies
       ...
   }
}
```

### 4. Testing

```
npm run test
```

### 5. Linter

```
npm run lint
```

### 🚨 Development notes:

1. Bundle `.d.ts` types issue

   There is an issue with Typescript types generation while using `parcel`. We need to use `.d.tsx` files instead of `.d.ts` ones. Because raw `.d.ts` files are sometimes skipped during bundle creation on `parcel`, generating empty references to `.d.ts` on bundler files.

   Issue link on Github: https://github.com/parcel-bundler/parcel/issues/7790
