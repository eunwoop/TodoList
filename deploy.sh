#!/bin/bash

set -ex

rm -rf deploy
mkdir deploy

npm run build
cp -r static deploy/

tar -cvf deploy.tar.gz deploy
