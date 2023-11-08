FROM node:21.0.0

WORKDIR /app
COPY package*.json ./

RUN npm install

COPY . .

EXPOSE  6000
CMD ["npm","run","devstartauth"]
