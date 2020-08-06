#!/bin/bash

set -e

ssh_key_pem_file=$1
ec2_host_username=ec2-user
ec2_host=ec2-3-14-26-72.us-east-2.compute.amazonaws.com

npm run build
cp -r static taskit/src/main/resources/

pushd taskit
./gradlew bootJar
popd
cp taskit/build/libs/taskit.jar ./app.jar
scp -i "${ssh_key_pem_file}" ./app.jar ${ec2_host_username}@${ec2_host}:~/
ssh -i "${ssh_key_pem_file}" ${ec2_host_username}@${ec2_host}
