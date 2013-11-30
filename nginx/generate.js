var yaml = require('yaml');
var fs = require('fs');
var path = require('path');
var interpolate = require('mutil').interpolate;
var file, fileName;


if ( process.env.USER === 'ec2-user' ) {
  fileName = path.join(__dirname, 'prod.yaml');
}
else {
	fileName = path.join(__dirname, 'dev.yaml');

	if (!fs.existsSync(fileName)) {
		file = fs.readFileSync(fileName + '.template', 'UTF-8');

		console.log( 'NGINX PORT WILL BE: ', process.argv[2] || 80 );

		file = interpolate( file, {
			GROUP : 'admin',
			PWD   : path.join( __dirname, '..' ),
			PORT  : process.argv[2] || 80,
			USER  : process.env.USER
		} );

		fs.writeFileSync( path.join(__dirname, 'dev.yaml'), file, 'UTF-8' );
	}
}

if ( !file ) {
  if (!fs.existsSync(fileName)) {
    console.error('No conf file exists');
  }
  else {
  	file = fs.readFileSync(fileName, 'UTF-8');
  }
}

var conf = yaml.eval(file);

var nginxConf = fs.readFileSync(path.join(__dirname, 'nginx.conf.template'), 'UTF-8');
var vhostConf = fs.readFileSync(path.join(__dirname, 'vhost.conf.template'), 'UTF-8');
var apisConf = fs.readFileSync(path.join(__dirname, 'apis.conf.template'), 'UTF-8');
var upstreamsConf = fs.readFileSync(path.join(__dirname, 'upstreams.conf.template'), 'UTF-8');


nginxConf = interpolate(nginxConf, conf);
vhostConf = interpolate(vhostConf, conf);
apisConf = interpolate(apisConf, conf);
upstreamsConf = interpolate(upstreamsConf, conf);

fs.writeFileSync(path.join(__dirname, 'nginx.conf'), nginxConf);
fs.writeFileSync(path.join(__dirname, 'vhost.conf'), vhostConf);
fs.writeFileSync(path.join(__dirname, 'apis.conf'), apisConf);
fs.writeFileSync(path.join(__dirname, 'upstreams.conf'), upstreamsConf);
