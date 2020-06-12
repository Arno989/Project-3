FROM python:3.8 as build-image

WORKDIR '/api'

COPY ./Backend/Docker/api/requirements.txt ./

RUN pip wheel --wheel-dir=/root/wheels -r requirements.txt




FROM python:3.8 as production-image

WORKDIR '/api'

COPY --from=build-image /root/wheels /root/wheels

COPY --from=build-image /api/requirements.txt ./

RUN pip install --no-index --find-links=/root/wheels -r requirements.txt

COPY ./ ./

RUN useradd -c 'uwsgi user,,,' -d /nonexistent -s /bin/false uwsgi

USER uwsgi

CMD ["uwsgi", "--ini", "app.ini"]