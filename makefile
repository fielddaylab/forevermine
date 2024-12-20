make: build
	
build: run
	
run:
	open ./index.html

server:
	python -m SimpleHTTPServer >/dev/null 2>&1 &

deploy:
	rsync -vrc * mli-field@fielddaylab.wisc.edu:/httpdocs/play/forevermine/game --exclude-from rsync-exclude

deploy-test:
	rsync -vrc * mli-field@fielddaylab.wisc.edu:/httpdocs/play/forevermine/test --exclude-from rsync-exclude