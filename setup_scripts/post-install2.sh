#!/bin/bash

# curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.32.1/install.sh | bash;

# nvm install stable;
# nvm install 6.6.0;
# nvm use 6.6.0;

sudo ln -s /etc/nginx/sites-available/itc /etc/nginx/sites-enabled/itc
sudo service nginx restart

# sudo reboot

echo ""
echo "===================="
echo " TIME FOR A REBOOT! "
echo "===================="
echo ""
echo "Don't forget to:"
echo "1) ssh-keygen -t rsa -b 2048 -N """
echo "2) install certbox"
echo "3) run deployment setup"

# ssh-keygen -t rsa -b 2048 -N "" # -f my.key"