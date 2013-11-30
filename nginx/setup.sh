sudo -v;

NGINX_HOME=/usr/local/etc/nginx
PWD=`pwd`

if [ -d "$1" ]; then
	NGINX_HOME=$1;
fi;

if [ -f "$NGINX_HOME/nginx.conf" ] && [ ! -L "$NGINX_HOME/nginx.conf" ]; then
	sudo mv "$NGINX_HOME/nginx.conf" "$NGINX_HOME/nginx.conf.original";
fi

if [ -f "dev.yaml" ]; then
	sudo rm dev.yaml;
fi

sudo mkdir -p ../logs/nginx;

sudo nginx -s stop;

PORT=`nc -z 127.0.0.1 80`;

if [ -z PORT ]; then
	PORT=80;
else
	PORT=8080;
fi

node_executable=`which node`;

if [ -x $node_executable ]; then
	$node_executable generate.js $PORT;
else
	echo "CAN'T FIND NODE!!!";
fi

sudo ln -Ffsv "$PWD/apis.conf" "$NGINX_HOME/apis.conf";
sudo ln -Ffsv "$PWD/nginx.conf" "$NGINX_HOME/nginx.conf";
sudo ln -Ffsv "$PWD/upstreams.conf" "$NGINX_HOME/upstreams.conf";
sudo ln -Ffsv "$PWD/vhost.conf" "$NGINX_HOME/vhost.conf";

sudo nginx;
