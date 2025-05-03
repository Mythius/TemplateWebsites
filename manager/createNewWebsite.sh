name=$1
password=$2
user="matthias"
# Required to install nvm
# Run nvm install 22.9.0

# Get all Code
cd /home/$user/TemplateWebsites
git clone https://github.com/mythius/mylib
mv mylib $name
cd $name
git checkout template

# Create password.txt file
echo $password > password.txt

export PATH="$PATH:/home/$user/.nvm/versions/node/v22.9.0/bin"
/home/$user/.nvm/versions/node/v22.9.0/bin/npm i

cd /home/$user/TemplateWebsites/manager
# Tack port number
if [ ! -f "currentPort.txt" ]; then
	echo 3000 > currentPort.txt
fi

port="$(cat currentPort.txt)"
nextport=$((port+1))
echo $nextport > currentPort.txt

cd /home/$user/TemplateWebsites/$name

# Create server.sh File
p1="cd "
path="$(pwd)"
echo "$p1$path" > server.sh
p1="/home/$user/.nvm/versions/node/v22.9.0/bin/node server.js "
echo "$p1$port" >> server.sh


# Update nginx
cd /home/$user/TemplateWebsites/manager
sudo bash updateNGINX.sh $name $port

# Create Service File for Server
completepath="$path/server.sh"
sudo bash createServiceFile.sh $name $completepath
