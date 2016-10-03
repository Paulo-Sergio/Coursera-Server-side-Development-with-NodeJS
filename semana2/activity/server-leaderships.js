var mongoose = require('mongoose');
var assert = require('assert');

var Leaderships = require('./models/leadership');

// Connection URL
var url = 'mongodb://localhost:27017/conFusion';
mongoose.connect(url);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log("Connected correctly to server");

    // create a new leadership
    Leaderships.create({
        name: 'Paul',
        image: 'public/paul.png',
        designation: 'Chief Epicurious Officer',
        abbr: 'CEO',
        description: 'Description test Leadership'
    }, function (err, leader) {
        if (err) throw err;
        console.log('Leadership created!!');
        console.log(leader);
        var id = leader._id;

        // get the Leadership
        setTimeout(function () {

            Leaderships.findByIdAndUpdate(id, {
                $set: {
                    description: 'Description test Leadership UPDATE!!'
                }
            }, { new: true })
                .exec(function (err, leader) {
                    if (err) throw err;
                    console.log('Leadership UPDATE!!');
                    console.log(leader);

                    db.collection('leaderships').drop(function () {
                        db.close();
                    });
                });

        }, 3000);
    });
});