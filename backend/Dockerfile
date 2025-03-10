FROM node:18-alpine as development
WORKDIR /app

RUN apk add --no-cache bash openssl

COPY package*.json ./
RUN npm install
COPY . .

FROM node:18-alpine as builder
WORKDIR /app
RUN apk add --no-cache bash openssl
COPY --from=development /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:18-alpine as production
WORKDIR /app
RUN apk add --no-cache bash openssl
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY ./prisma ./prisma
COPY ./scripts/start_prod.sh ./start_prod.sh
RUN chmod +x ./start_prod.sh
CMD ["/app/start_prod.sh"]
