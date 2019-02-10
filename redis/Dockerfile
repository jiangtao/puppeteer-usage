FROM redis:4.0-alpine
COPY redis.conf /etc/redis/redis.conf
RUN mkdir -p /redis/data && redis-server /etc/redis/redis.conf 

