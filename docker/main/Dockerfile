FROM waltzofpearls/nodejs

MAINTAINER waltzofpearls <rollie.ma@gmail.com>

ADD bin/docker/main/run /etc/service/shorten.js/run

WORKDIR /srv/www/shorten.js

COPY ../. .

RUN npm run gulp build

ENV PORT 3000
ENV DEBUG shorten.js

EXPOSE 3000

CMD ["/sbin/my_init"]
