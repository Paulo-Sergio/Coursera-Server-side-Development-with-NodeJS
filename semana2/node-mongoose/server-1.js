var mongoose = require('mongoose');
var assert = require('assert');

var Dishes = require('./models/dishes-1');

// Connection URL
var url = 'mongodb://localhost:27017/conFusion';
mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log("Connected correctly to server");

    // create a new Dish
    var newDish = Dishes({
        name: 'Uthapizza',
        description: 'Test'
    });

    // save the Dish
    newDish.save(function (err) {
        if (err) throw err;

        console.log('Dish created!!');

        // get all the Dishes
        Dishes.find({}, function (err, dishes) {
            if (err) throw err;

            // object of all the dishes
            console.log(dishes);

            db.collection('dishes').drop(function () {
                db.close();
            });
        });
    });
});