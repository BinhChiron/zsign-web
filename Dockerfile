FROM node:18-alpine

WORKDIR /app

RUN apk add --no-cache zip unzip

COPY package*.json ./

RUN npm install --production

COPY . .

CMD ["node", "zsign.js"]