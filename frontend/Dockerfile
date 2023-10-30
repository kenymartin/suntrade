FROM node:16.13 AS Development

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

EXPOSE  3000
CMD ["npm","start"]