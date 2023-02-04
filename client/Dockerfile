# docker next js

FROM node:16-alpine

WORKDIR /app

COPY package.json .

RUN npm install -g pnpm
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
