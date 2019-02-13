FROM jerret321/puppeteer-linux
USER root

ENV DIR=/home/pptruser/project 
ENV PORT=8888 
ENV REDIS_PORT=6379 
ENV REDIS_HOST=redis 
ENV REDIS_DB=15
ENV PUPPETEER_LINUX=true
ENV NODE_ENV=production

COPY . $DIR
WORKDIR $DIR
VOLUME $DIR/logs
VOLUME $DIR/download

# huaban.com
# ENV huaban_pass 
# ENV huaban_mobile 

RUN npm i --registry=https://registry.npm.taobao.org \  
    && npm i pm2 -g --registry=https://registry.npm.taobao.org \
    && chown -R pptruser:pptruser /usr/local/lib/node_modules \
    && chown -R pptruser:pptruser $DIR/logs \
    && chown -R pptruser:pptruser ./node_modules \
    && chown -R pptruser:pptruser $DIR/download

# USER pptruser

# CMD ["pm2-runtime", "pm2.json"]
