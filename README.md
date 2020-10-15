# OFB call center front

## Tech stack

React
Redux / [Redux Toolkit](https://redux-toolkit.js.org/)
[Chakra UI](https://next.chakra-ui.com)
Typescript
[React Aria](https://react-spectrum.adobe.com)
[Axios](https://github.com/axios/axios)

## How to navigate / Folder structure

`src/components` - Reusable components that are used across the app. If a components needs more than more file to work properly or needs to be splitted into multiple sub-components then put them in a folder (e.g. `src/components/ComponentName`), otherwise just use a single file.

`src/modules` - Modules of the app

**Module** - are a big piece of the app (a.k.a. container or page). A module has a purpose (e.g. authentication, dashboard page, etc). It's recommended to name a module based on its purpose. A module folder can contain multiple files (e.g. sub-modules or any specific components/functions that are used by this module).

`src/types` - Typescript types and anything related to it (e.g. custom types for 3rd packages or types for a global state).

## State management

We use Redux along with [`@reduxjs/toolkit`](https://redux-toolkit.js.org/) for global state management. And [React hooks](https://reactjs.org/docs/hooks-intro.html) for local states. If not familiar with any of them, please familiarize yourself with them.

## Table component

We use `@react-aria/table` for building a custom table component. The main goal of using it is to make our components accessible. At the moment of writing this readme, there's no official documentation for `@react-aria/table`. So we recommend cloning [`react-spectrum`'s github repo](https://github.com/adobe/react-spectrum) into your machine and run its storybook locally. Stories (a.k.a. examples of the component) are located [here](https://github.com/adobe/react-spectrum/blob/main/packages/%40react-spectrum/table/stories/Table.stories.tsx). If you have any question or problems with it, please [open an issue](https://github.com/adobe/react-spectrum/issues/new/choose) or search for [existing issues](https://github.com/adobe/react-spectrum/issues).

**Happy hacking 🚀🔥😎**

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br /> Open
[http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br /> You will also see any lint errors
in the console.

### `yarn build`

Builds the app for production to the `build` folder.<br /> It correctly bundles
React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br /> Your app is
ready to be deployed!

See the section about
[deployment](https://facebook.github.io/create-react-app/docs/deployment) for
more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can
`eject` at any time. This command will remove the single build dependency from
your project.

Instead, it will copy all the configuration files and the transitive
dependencies (webpack, Babel, ESLint, etc) right into your project so you have
full control over them. All of the commands except `eject` will still work, but
they will point to the copied scripts so you can tweak them. At this point
you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for
small and middle deployments, and you shouldn’t feel obligated to use this
feature. However we understand that this tool wouldn’t be useful if you couldn’t
customize it when you are ready for it.

## Learn More

You can learn more in the
[Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
