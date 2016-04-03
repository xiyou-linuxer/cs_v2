TEST_FILES =  $(shell ls -S `find test/unit -type f -name "*.test.js" -print`)
LESS_FILES = $(shell find assets/less -name '*.less')
CSS_FILES = $(LESS_FILES:assets/less/%.less=build/assets/css/%.css)
JS_FILES = $(shell find assets/js -name '*.js')
BUILD_JS_FILES = $(JS_FILES:assets/js/%.js=build/assets/js/%.js)

export PATH := node_modules/.bin:$(PATH)
export SHELL := /bin/bash

install:
	@npm install

jshint: install
	@jshint ./app ./assets/js

server: build
	@rekoala --config config/config

dev-server: copy less
	@rekoala --config config/config

dev:
	@NODE_ENV=dev \
	nodemon -q\
		-e js,less \
		--watch ./app \
		--watch ./assets \
		--watch ./config \
		-x 'make dev-server'

test: install
	@NODE_ENV=test mocha \
		--harmony \
		--reporter spec \
		--timeout 5000 \
		--require should \
		--require co-mocha \
		--require ./test/helper.js \
		$(TEST_FILES)

%.css:
	@lessc --autoprefix --clean-css $(subst css,less,$@) $@

%.min.js: %.js
	@uglifyjs --compress --output $@ $<

copy: clean
	@mkdir build
	@cp -rf assets build

es6to5:
	@babel assets/js --out-dir build/assets/js

minify: $(BUILD_JS_FILES:.js=.min.js)

less: $(CSS_FILES)

build: install clean copy es6to5 minify less
	@echo 'assets build success'

clean-build:
	@rm -rf build

clean:  clean-build
