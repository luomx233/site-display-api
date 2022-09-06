FROM node:16
ENV NODE_ENV=production
WORKDIR /app
COPY . .
RUN npm config set registry https://registry.npm.taobao.org
RUN npm run build
EXPOSE 7749
CMD npm install&&npm run build&&npm run start:prod