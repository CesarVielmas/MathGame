FROM node:18-bullseye
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
EXPOSE 8081 19000 19006 19001
ARG APP_MODE=web
ENV APP_MODE=${APP_MODE}
ENTRYPOINT ["sh", "-c"]
CMD ["npm run $APP_MODE"]