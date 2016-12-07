#!/bin/bash

# sudo chmod 755 <filepath>

# basic update
sudo apt-get -y --force-yes update;
sudo apt-get -y --force-yes upgrade;

curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -

# install apps
sudo apt-get -y install \
    nodejs git nginx

sudo npm install -g pm2 yarn;

sudo chown -R `id -u` /etc/nginx/
cd /etc/nginx/sites-enabled/;
sudo mv default default.bak;

cd;

# # apparently scp the rsa key is not enough to "register it", using this hack to initialise the process
git clone git@github.com:xuatz/import-tax-calculator.git;
rm -rf import-tax-calculator/
# # now remote pm2 deploy will work