build: static html js sw
	@echo '-- git : $(GIT_VERSION)'
	@echo '+++++++++++++++++++++++++++++ build done +++++++++++++++++++++++++++++'

# ######################################
# static directory
static:
	@echo ''
	@echo 'creating `static` directory'
	mkdir -p ./static

# ######################################
# HTML
html: ./static/index.html
./static/index.html: src/markup/index.html
	@echo ''
	@echo '------> copying index.html'
	cp -v src/markup/index.html ./static/index.html

# ######################################
# Javascript
lint:
	@echo ''
	@echo '------> lint Javascript 📚'
	node ./node_modules/eslint/bin/eslint.js ./src/scripts

js: ./static/bundle.min.js

./static/bundle.min.js: src/* node_modules changelog __env lint
	@echo ''
	@echo "------> bundle Javascript $(NODE_ENV)"
	sh ./_makeBundleForEnv.sh $(NODE_ENV)
	@echo ''
	@echo '------> done with Javascript 😃'

# ######################################
# npm packages for anyone who needs them
node_modules: package.json
	@echo ''
	@echo '------> npm install'
	yarn install

# ######################################
# clean
clean:
	@echo ''
	@echo '------> clean'
	rm -rf static/*
	rm -rf node_modules
	rm -f ./src/changelog.js
	rm -f ./__env.js


.PHONY: build html changelog __env lint sw js misc clean