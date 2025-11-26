
#!/bin/bash
set -eux
echo "------ restart---------------"
pm2 restart /opt/bitnami/app/dist/server.js >> /opt/bitnami/deploy.log
