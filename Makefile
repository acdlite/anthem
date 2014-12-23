6TO5_CMD = node_modules/.bin/6to5
MOCHA_CMD = node_modules/.bin/mocha

test: build
	$(MOCHA_CMD) dist/**/__tests__/*-test.js --require dist/test-init.js

build: clean
	$(6TO5_CMD) src -d dist

clean:
	rm -rf dist
