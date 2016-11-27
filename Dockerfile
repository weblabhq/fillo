FROM node:6.9.1
MAINTAINER Cristian Guraliuc <cristi@weblab.io>

# Create user
RUN groupadd -r nodejs \
  && useradd -m -r -g nodejs nodejs

USER nodejs

# Create app directory
RUN mkdir -p /home/nodejs/usr/src/app
WORKDIR /home/nodejs/usr/src/app

# Install app dependencies
COPY package.json /home/nodejs/usr/src/app/
RUN npm install --production

# Bundle app source
COPY . /home/nodejs/usr/src/app

# Expose port
EXPOSE 3000

ENV NODE_ENV production

CMD ["node","server.js"]
