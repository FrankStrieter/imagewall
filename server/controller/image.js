var express = require('express');
var router = express.Router();
var request = require('request-promise');
var path = require('path');
var queueService = require('./../services/imagequeue');
var Alea = require('alea');
var fs = require('fs');
var zip = require('express-zip');

var random = new Alea();
var interval = 25000;

        function getArchive(req, res,next){
            var files = [];
            fs.readdir(path.resolve('images/'),(err,f) => {
                if(err){
                     return res.status(400).send(err)
                }
                f.map(file => {files.push({path:'images/'+ file,name: file})})
                fs.readdir(path.resolve('images_hidden/'),(err,f) => {
                if(err){
                     return res.status(400).send(err)
                }
                f.map(file => {files.push({path:'images_hidden/'+ file,name: file})})
                res.zip(files)  
            })
            })
        }
        
        
        function setActive(req,res,next){
            console.log(req.body.filename);
            //res.status(300).send();
            var dest = fs.createWriteStream('images/'+req.body.filename);
            var source = fs.createReadStream('images_hidden/'+req.body.filename);

            source.pipe(dest);
            source.on('end', function() {
                fs.unlink('images_hidden/'+req.body.filename, err => {
                    if(err){
                        res.status(400).send(err);
                    } else {
                         res.status(200).send();
                    }
                });
           ; /* copied */ });
            source.on('error', function(err) {
            res.status(400).send(err); /* error */ });
        }

        function setHidden(req,res,next){
            console.log(req);
            //res.status(300).send();
            var source = fs.createReadStream('images/'+req.body.filename);
            var dest = fs.createWriteStream('images_hidden/'+req.body.filename);

            source.pipe(dest);
            source.on('end', function() {
                fs.unlink('images/'+req.body.filename, err => {
                    if(err){
                        res.status(400).send(err);
                    } else {
                         res.status(200).send();
                    }
                });
            });
            source.on('error', function(err) {
            res.status(400).send(err); /* error */ });
        }

        function getLength(req,res,next){
            if(queueService.queue){
            res.status(200).send({length:queueService.queue.length});
        }
        else{
            res.status(200).send({length:0});
        }
    }

    function setTimerInterval(req,res,next){
        if(req.body.interval){
            interval = req.body.interval;
            res.status(200).send();
        } else {
            req.status(400).send();
        }
    }
    
    function getInterval(req,res,next){
            res.status(200).send({interval:interval});
        }

        function getAllImages(req,res,next){
            var files = [];
            fs.readdir(path.resolve('images/'),(err,f) => {
                if(err){
                     return res.status(400).send(err)
                }
                f.map(file => {files.push({file: file,isvisible:true})})
                fs.readdir(path.resolve('images_hidden/'),(err,f) => {
                if(err){
                     return res.status(400).send(err)
                }
                f.map(file => {files.push({file: file,isvisible:false})})
                res.status(200).send(files)  
            })
            });
            
        }

        function getnextimageURL(req, res, next) {
            if(queueService.queue && queueService.queue.length != 0){
               return res.status(200).send(queueService.pop());
            }
            else{
            //get Randowm Image from imageDirectiory    
            var files = [];
            fs.readdir(path.resolve('images/'), (err,f) => {
                if(err){
                     return res.status(400).send(err)
                }
                files = shuffle(f);
                return res.status(200).send(files[Math.round(random()*(files.length-1))]);
            });
            //res.status(200).sendFile(path.resolve('server/images/images.jpg'),);
            }
        }

     function getNextImage(req, res, next) {
            console.log('get');
            //look for images in queue
            if(queueService.queue && queueService.queue.length != 0){
               return res.status(200).sendFile(path.resolve('images/'+queueService.pop()));
            }
            else{
            //get Randowm Image from imageDirectiory    
            var files = [];
            fs.readdir(path.resolve('server/images/'), (err,f) => {
                if(err){
                     return res.status(400).send(err)
                }
                files = shuffle(f);
                return res.status(200).sendFile(path.resolve('images/'+files[Math.round(random()*(files.length-1))]));
            });
            //res.status(200).sendFile(path.resolve('server/images/images.jpg'),);
            }
    }

    function shuffle(a) {
    for (let i = a.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
    return a;
}
function uploadImage(req, res, next) {
    /**get files*/
    console.log(req.files.imagefile);
    fs.readFile(req.files.imageFile.path, function (err, data) {
        const newFileName = new Date().getTime()+'_'+req.files.imageFile.originalFilename;
        fs.writeFile(path.resolve('images/'+newFileName), data, function (err) {
            if(err){
                res.status(400).send(err);
            }
            queueService.push(newFileName);
            console.log('queue: '+ queueService.queue);
            return res.status(201).send();
        });
    });
}

module.exports = {
    getNextImage,
    uploadImage,
    getnextimageURL,
    getAllImages,
    setActive,
    setHidden,
    getLength,
    getInterval,
    setTimerInterval,
    getArchive
};