TEST_FILES =  $(shell ls -S `find test/unit -type f -name "*.test.js" -print`)
LESS_FILES = $(shell find resources/assets/less -name '*.less')
CSS_FILES = $(LESS_FILES:resources/assets/less/%.less=public/assets/css/%.css)
JS_FILES = $(shell find resources/assets/js -name '*.js')
BUILD_JS_FILES = $(JS_FILES:resources/%.js=public/%.min.js)

export PATH := node_modules/.bin:$(PATH)
export SHELL := /bin/bash

install:
	@cnpm install

jshint: install
	@jshint ./app ./resources/assets/js

server:
	@npm run server

dev-server: build server

dev:
	@NODE_ENV=dev \
	nodemon -q\
		-e js,json,less \
		--ignore package.json \
		--ignore node_modules \
		--ignore public \
		--ignore sftp-config.json \
		-x 'make dev-server'

test:
	@NODE_ENV=test mocha \
		--harmony \
		--reporter spec \
		--timeout 5000 \
		--require should \
		--require co-mocha \
		--require ./test/helper.js \
		$(TEST_FILES)

%.css:
	@lessc --autoprefix --clean-css $(subst public, resources, $(subst css,less,$@)) $@

%.min.js:%.js
	@uglifyjs --compress --output $@ $^

copy: copy_tips
	@mkdir -p public/assets
	@cp -rf resources/assets/libs public/assets/libs
	@cp -rf resources/assets/images public/assets/images

es6to5:
	@babel resources/assets/js --out-dir public/assets/js >/dev/null

scripts: scripts_tips es6to5 $(BUILD_JS_FILES)

less: less_tips $(CSS_FILES)

build: clean copy scripts less

clean-build:
	@rm -rf public/assets

clean:  clean-build

copy_tips:
	@echo 'copy lib files and images...'

scripts_tips:
	@echo 'build js files...'

less_tips:
	@echo 'build less files...'
