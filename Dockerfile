FROM node:6.9.2-alpine
MAINTAINER Cristian Guraliuc <cristi@weblab.io>

# Add bash
RUN apk add --update bash && rm -rf /var/cache/apk/*

# Create app directory
RUN mkdir -p /opt/app
WORKDIR /opt/app

# Create user
RUN adduser -D -u `shuf -i5000-15000 -n1` worker
RUN chown -R worker:worker /opt/app

USER worker

# Install app dependencies
COPY package.json /opt/app/
RUN npm install --production

# Bundle app source
COPY . /opt/app

# Expose port
EXPOSE 3000

ENV NODE_ENV production

CMD ["node","server.js"]
