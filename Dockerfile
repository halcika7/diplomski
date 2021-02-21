FROM node

WORKDIR /usr/src/app

COPY . .

RUN rm -rf ./packages/frontend
RUN rm -rf ./packages/backend/__tests__

RUN yarn

RUN yarn build

COPY .env.production ./packages/backend/.env

ENV NODE_ENV production

EXPOSE 8080

CMD ["yarn", "start"]
