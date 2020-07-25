# FROM node:12.18-alpine
# ENV NODE_ENV production
# WORKDIR /usr/src/app
# COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
# RUN npm install --production --silent && mv node_modules ../
# COPY . .

# CMD npm run start

FROM node

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

COPY . .

CMD [ "node", "index.js" ]