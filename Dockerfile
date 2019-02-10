FROM redream/puppeteer-base
COPY . /project
WORKDIR /project
VOLUME /project/logs
VOLUME /project/download

# server
ENV PORT 8888
# redis
ENV REDIS_PORT 6379
ENV REDIS_HOST 127.0.0.1
# ENV REDIS_PASS 
ENV REDIS_DB 15

# node
ENV NODE_ENV production
ENV PUPPETEER_LINUX true
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true
ENV PUPPETEER_DOWNLOAD_HOST https://storage.googleapis.com.cnpmjs.org

# huaban.com
# ENV huaban_pass 
# ENV huaban_mobile 

RUN mkdir -p /project \
    && chmod -R 777 /project \
    && groupadd -r pptruser \
    && useradd -r -g pptruser -G audio,video pptruser \
    && mkdir -p /home/pptruser/Downloads \
    && chown -R pptruser:pptruser /home/pptruser \
    && chown -R pptruser:pptruser /usr/local/lib/node_modules \
    && npm i --registry=https://registry.npm.taobao.org \  
    && npm i pm2 -g --registry=https://registry.npm.taobao.org \
    && chown -R pptruser:pptruser ./node_modules

ENTRYPOINT ["dumb-init", "--"]

# Run everything after as non-privileged user.
USER pptruser
# CMD ["nohup","node", "src/app.js", "&"]
CMD ["pm2-runtime", "pm2.json"]
