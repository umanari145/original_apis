
#!/bin/bash
set -eux
pm2 restart /opt/bitnami/app/dist/server.js >> /opt/bitnami/deploy.log
