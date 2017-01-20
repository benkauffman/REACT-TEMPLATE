FROM node:argon

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install

# copy the app to the container
COPY .git /usr/src/app/.git
COPY src /usr/src/app/src
COPY server.js /usr/src/app/server.js
COPY webpack.config.js /usr/src/app/webpack.config.js

EXPOSE 5000
CMD [ "npm", "run", "deploy" ]
