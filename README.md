# TemplateWebsites
To get this working on your computer, you need to install the following things:

## NVM:
`curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash`
`export NVM_DIR="$HOME/.nvm"`
`[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"`
`nvm install 22.9.0`

## Nginx:
`sudo apt install nginx -y`

## Certbot:
`sudo apt install certbot python3-certbot-nginx`

## Gdrive:
See:
https://github.com/glotlabs/gdrive/releases

Instruction on how to authenticate with google drive:
https://github.com/glotlabs/gdrive/blob/main/docs/create_google_api_credentials.md

I used a Raspberry Pi, and compiled this version of Gdrive for aarch64:
https://drive.google.com/file/d/1-8XcOuPSDXZtOXwEYGc12sXAhzp_dsCO/view

`gdrive account add`

## Clone this repo into the home directory on RaspberryPi or Ubuntu
`/home/<you>/TemplateWebsites`

## To Make a new website:
`cd TemplateWebsite/manager`

First set up an A record with your DNS to point towards your website / subdomain.

Make a copy of 
Website Template Google Drive
https://docs.google.com/spreadsheets/d/1krlUz5I4pBlbyine5ZK7wwfmdwMFIKSYAD_RmG01uXM/edit?usp=sharing

Choose a password

Then run:
`sudo sh createNewWebsite.sh yourwebsite.com password`

Cell A1 should have the ID of a google drive folder 
Cell A2 should have https://yourwebsite.com
Cell B1 should the passwword you chose