FROM node:16.14.0
WORKDIR /home/node/app
COPY . .
RUN npm install
CMD npm start
EXPOSE 3000
