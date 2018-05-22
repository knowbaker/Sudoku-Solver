FROM python:2.7-slim

WORKDIR /app

ADD . /app

EXPOSE 9000

CMD ["python", "-m", "SimpleHTTPServer", "9000"]
