FROM node:8.11.2-slim

RUN npm install -g http-server

WORKDIR /app

ADD . /app

EXPOSE 9000

CMD ["http-server", "./", "-p", "9000"]
