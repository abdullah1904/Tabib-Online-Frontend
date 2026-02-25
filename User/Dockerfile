FROM node:24-alpine

WORKDIR /app

COPY package.json package-lock.json* ./

RUN npm ci

COPY . .

COPY .env.build .env

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
