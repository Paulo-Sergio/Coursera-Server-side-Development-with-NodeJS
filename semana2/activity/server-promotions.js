var mongoose = require('mongoose');
var assert = require('assert');

var Promotions = require('./models/promotions');

// Connection URL
var url = 'mongodb://localhost:27017/conFusion';
mongoose.connect(url);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log("Connected correctly to server");

    // create a new promotion
    Promotions.create({
        name: 'Uthapizza',
        image: 'public/test',
        label: 'New',
        price: 4.59,
        description: 'Test Description'
    }, function (err, promo) {
        if (err) throw err;
        console.log('Promotion created!!');
        console.log(promo);
        var id = promo._id;

        // get the promotion
        setTimeout(function () {

            Promotions.findByIdAndUpdate(id, {
                $set: {
                    description: 'Test Description UPDATE!!'
                }
            }, { new: true })
                .exec(function (err, promo) {
                    if (err) throw err;
                    console.log('UPDATE PROMOTION');
                    console.log(promo);

                    db.collection('promotions').drop(function () {
                        db.close();
                    });
                });

        }, 3000);
    });
});