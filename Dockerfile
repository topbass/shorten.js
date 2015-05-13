FROM waltzofpearls/nodejs

MAINTAINER waltzofpearls <rollie.ma@gmail.com>

ADD bin/docker-image/run /etc/service/shorten.js/run

WORKDIR /srv/www/shorten.js

COPY . .

RUN \
    npm run build && \
    tee config/development.yml \
        config/testing.yml \
        config/production.yml < config/dist.yml

ENV PORT 3000
ENV DEBUG shorten.js

EXPOSE 3000

CMD ["/sbin/my_init"]
