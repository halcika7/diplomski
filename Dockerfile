FROM node

WORKDIR /usr/src/app

COPY . .

RUN rm -rf ./packages/frontend

RUN yarn

RUN yarn build

# stage 2
FROM node

WORKDIR /usr/src/app

COPY . .

RUN rm -rf ./packages/frontend
RUN rm -rf ./packages/backend/__tests__
RUN rm -rf ./packages/backend/coverage
RUN rm -rf ./app.json

RUN yarn install --prod

COPY --from=0 /usr/src/app/packages/backend/dist ./packages/backend/dist
COPY --from=0 /usr/src/app/packages/common/dist ./packages/common/dist

COPY .env.production ./packages/backend/.env

ENV NODE_ENV production

EXPOSE 8080

CMD ["yarn", "start"]
