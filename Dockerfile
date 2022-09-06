FROM node:16
ENV NODE_ENV=production
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
RUN npm run tart:prod
EXPOSE 7749