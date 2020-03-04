FROM node:10

RUN mkdir /usr/src/app

WORKDIR /usr/src/app

COPY package.json ./
COPY ./ ./

#RUN npm run clean:sources
RUN npm install

EXPOSE 3030

CMD [ "node", "app.js" ]