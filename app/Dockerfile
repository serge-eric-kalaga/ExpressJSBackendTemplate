FROM node:lts-alpine3.22

# ENV NODE_ENV development

WORKDIR /app

COPY . .

RUN npm install --legacy-peer-deps  && npm install -g nodemon

CMD [ "npm", "run", "dev"]

EXPOSE 5000