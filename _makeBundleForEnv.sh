#!/bin/bash

if [ "$1" = "production" ]; then
  echo "bundling for production";
  node ./node_modules/browserify/bin/cmd.js \
      -t [ reactify --es6 ] \
      -e ./src/scripts/App.js \
      -o ./static/bundle.js
  node ./node_modules/uglify-js/bin/uglifyjs \
        --output ./static/bundle.min.js \
        --screw-ie8 \
        ./static/bundle.js
else
  echo "bundling for development";
  node ./node_modules/browserify/bin/cmd.js \
      -d \
      -t [ reactify --es6 ] \
      -e ./src/scripts/App.js \
      -o ./static/bundle.min.js
fi;
