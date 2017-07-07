var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var router = express.Router();
var cors = require('cors')


var users = require('./controller/users');
var imageCtrl = require('./controller/image');
var multipartMiddleware = require('connect-multiparty')

var app = express();
app.use(cors());

app.use('/images',express.static(__dirname + '/images'));
app.use('/images_hidden',express.static(__dirname + '/images_hidden'));
//app.use(busboy());
app.use(multipartMiddleware());

app.use(bodyParser.json({limit: '500mb'}));
app.use(bodyParser.urlencoded({limit: '500mb', extended: false }));

//app.use(express.multipart())
app.use(cookieParser())

/**AP1 V1 */

/** images */
app.use('/api/v1/users', users);
app.use('/api/v1/images',router.get('/next',imageCtrl.getNextImage));
app.use('/api/v1/images',router.get('/nexturl',imageCtrl.getnextimageURL));
app.use('/api/v1/images',router.post('/upload',imageCtrl.uploadImage));
app.use('/api/v1/images',router.get('/all',imageCtrl.getAllImages));
app.use('/api/v1/images',router.post('/setactive',imageCtrl.setActive))
app.use('/api/v1/images',router.post('/sethidden',imageCtrl.setHidden));
app.use('/api/v1/images',router.get('/length',imageCtrl.getLength));
app.use('/api/v1/images',router.get('/interval',imageCtrl.getInterval));
app.use('/api/v1/images',router.post('/setinterval',imageCtrl.setTimerInterval));
app.use('/api/v1/images',router.get('/archive',imageCtrl.getArchive));
/**configuration 
app.use('/api/v1/configuration',router.get('/get',null));
app.use('/api/v1/configuration',router.put('/set',null))
*/
module.exports = app;
