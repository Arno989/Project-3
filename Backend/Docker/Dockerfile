FROM python:3.7-alpine

WORKDIR '/app'

RUN apk add --no-cache linux-headers g++

RUN pip install -r requirements.txt

COPY ./ ./

RUN addgroup -S uwsgi && adduser -S uwsgi -G uwsgi

USER uwsgi

CMD ["uwsgi", "--ini", "app.ini"]