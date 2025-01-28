name=$1
shfile=$2
sn="$name.service"
path="/etc/systemd/system/$name.service"

echo "[Unit]" > $path
echo "Description=Server for $name\n" >> $path
echo "[Service]" >> $path
echo "User=root" >> $path
echo "ExecStart=/bin/bash $shfile\n" >> $path
echo "Restart=on-failure" >> $path
echo "RestartSec=1s" >> $path
echo "[Install]" >> $path
echo "WantedBy=multi-user.target" >> $path

systemctl daemon-reload
systemctl enable $sn
systemctl start $sn
