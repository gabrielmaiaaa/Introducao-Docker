FROM node:20.3.0-alpine3.18
WORKDIR /app
ENV MONGODB=mongo
EXPOSE 3000
COPY package*.json .
RUN npm install
COPY . .
CMD [ "node", "app.js" ]