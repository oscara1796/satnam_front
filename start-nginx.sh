#!/bin/sh
# Replace ${PORT} with the actual port environment variable
sed -i 's/${PORT}/'$PORT'/g' /etc/nginx/conf.d/default.conf
# Start Nginx in the foreground
nginx -g 'daemon off;'
