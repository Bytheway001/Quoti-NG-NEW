 FROM node:14.17-alpine3.12
 WORKDIR /app
 ENV PATH /app/node_modules/.bin:$PATH
 COPY package.json ./
 COPY . .
 RUN yarn install
 RUN yarn upgrade node-sass
 EXPOSE 3000
 RUN chmod 777 node_modules
 
 CMD ["yarn","start"]