
# __REACT-TEMPLATE__

## Running Locally

Requirements

* [Node.js](https://nodejs.org/)
* [Docker](https://www.docker.com/)

First install the dependencies:

```
$ npm install
```

### Running the app with Webpack
```
$ npm start
```

This will run the app using Webpack dev server.  This is the preferred method for running the app locally for development.

Your app should now be running on [localhost:3000](http://localhost:3000/).


### Running for development using node server
This will use an Express node server instead of Webpack.  Usefully for debugging server/deployment configs.  The app will be running on [localhost:5000](http://localhost:5000/).

```
$ npm run dev
```

### Running for deployment using node server
This will build for deployment and run a node server.  This is the command used by the server on deployment.  Useful for reproducing the deployment environment locally.  The app will be running on [localhost:5000](http://localhost:5000/).

```
$ npm run deploy
```



### Building for Deployment
This command will build the app and create a public folder.  Use this folder to deploy to the environment of your choice.
```
$ npm run build
```
