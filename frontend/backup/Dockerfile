FROM node:21.0.0

WORKDIR /app
COPY package*.json ./

RUN npm install

COPY . .

EXPOSE  6000
EXPOSE  4000
CMD ["npm","run","devstartauth" & "npm","run","devstart"]