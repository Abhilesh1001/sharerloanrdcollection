#!/bin/bash
set -e

echo "Deployment started..."

# Fix Git safe directory issue
git config --global --add safe.directory /var/www/sharerloanrdcollection

# Go to project folder
cd /var/www/sharerloanrdcollection

# Pull the latest version of the app
git fetch origin main
git reset --hard origin/main
echo "New changes copied to server!"

echo "Installing Dependencies..."
npm install --yes

echo "Creating Production Build..."
npm run build

echo "PM2 Reload"
pm2 reload sharerloanrdcollection

echo "Deployment Finished!"
