#/bin/bash
rm -rf /home/dec/dec-code/dec/dec/static/assets/img/client
ln -sf /var/www/vhosts-efs/python-dec /home/dec/dec-code/dec/dec/static/assets/img/client
chown -R dec:www-data /home/dec/dec-code
systemctl restart dec.service

