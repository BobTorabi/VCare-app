FROM node:16-alpine as build-stage

LABEL author="MEGA-DevOps"
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

WORKDIR /build
COPY package*.json /build/
RUN npm install
COPY . /build
RUN npm run build

FROM node:16-alpine as production-stage
WORKDIR /build
COPY --from=build-stage /build/package*.json /build/
RUN npm install --production
COPY --from=build-stage /build/.output /build/.output


RUN npm install pm2 -g
EXPOSE 3000
CMD ["node", "/build/.output/server/index.mjs"]
