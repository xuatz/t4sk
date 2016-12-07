echo ""
echo "===================="
echo " you should have created a new key pair before running this operation "
echo "===================="
echo ""

ssh -i ~/WorkingSpace/fs/fs-xuatz-dev.pem ubuntu@35.162.26.38 -F ~/.ssh/config 'bash -s' < post-install1.sh;
# 3) ===============
scp -i ~/WorkingSpace/fs/fs-xuatz-dev.pem itc ubuntu@35.162.26.38:/etc/nginx/sites-available/itc;
# 4) ===============
ssh -i ~/WorkingSpace/fs/fs-xuatz-dev.pem ubuntu@35.162.26.38 -F ~/.ssh/config 'bash -s' < post-install2.sh;


# wget https://dl.eff.org/certbot-auto;
# chmod a+x certbot-auto;
# ./certbot-auto;
# ./certbot-auto certonly --standalone -d sit.importtaxcalculator.org;
#this does not include www...

# ======================================================================

# pm2 deploy ecosystem.json sit setup;
# itc-deploy-beta;

