subdomain=$1
port=$2

filename="$(ls /etc/nginx/sites-enabled)"
f="/etc/nginx/sites-enabled/$filename"

echo "\nserver {" >> $f
echo "\tlisten 80;" >> $f
echo "\tserver_name $subdomain;" >> $f
echo "\tlocation / {" >> $f
echo "\t\tproxy_pass http://localhost:$port;" >> $f
echo "\t\tproxy_set_header X-Real-IP \$remote_addr;" >> $f
echo "\t\tproxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;" >> $f
echo "\t\tproxy_set_header X-Forwarded-Proto \$scheme;" >> $f
echo "\t\tproxy_set_header Host \$host;" >> $f
echo "\t}" >> $f
echo "}\n" >> $f

systemctl restart nginx


# Install HTTPS certificate
 echo 1 | certbot --nginx -d $subdomain --redirect
