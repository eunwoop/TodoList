#!/bin/bash

set -e

npm run build
cp -r static taskit/src/main/resources/

pushd taskit
./gradlew bootJar
popd
cp taskit/build/libs/taskit.jar ./app.jar

