#!/bin/bash
set -e

echo "Deployment started..."

# Pull the latest version of the app

git config --global --add safe.directory /var/www/sharerloanrdcollection


git fetch --all
git reset --hard origin/main

echo "New changes copied to server... !"

echo "Installing Dependencies..."
npm install --yes

echo "Creating Production Build..."
npm run build

echo "PM2 Reload"
pm2 reload sharerloanrdcollection

echo "Deployment Finished!"