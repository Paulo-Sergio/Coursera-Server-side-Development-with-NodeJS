var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Favorites = require('../models/favorites');
var Verify = require('./verify');

var favoriteRouter = express.Router();
favoriteRouter.use(bodyParser.json());

favoriteRouter.route('/')
    .all(Verify.verifyOrdinaryUser)
    .get(function (req, res, next) {
        var userId = req.decoded._doc._id;

        Favorites.find({ postedBy: userId })
            .populate('postedBy')
            .populate('dishes')
            .exec(function (err, dish) {
                if (err) return next(err);
                res.json(dish);
            })
    })
    .post(function (req, res, next) {
        var userId = req.decoded._doc._id;
        var dishId = req.body._id;

        Favorites.findOne({ postedBy: userId }, function (err, favorite) {
            if (err) { console.log(err) };
            if (!favorite) { //if doesn't already exist

                Favorites.create(req.body, function (err, favorite) {
                    if (err) throw err;
                    var id = favorite._id;
                    favorite.postedBy = userId;
                    favorite.dishes.push(dishId);
                });
                favorite.save(function (err, favorite) {
                    if (err) throw err;
                    console.log('favorite created!');
                    res.json(favorite);
                });
            } else {
                favorite.dishes.push(req.body);
                favorite.save(function (err, favorite) {
                    if (err) throw err;
                    console.log('Updated Favorites!');
                    res.json(favorite);
                });
            }
        });
    })
    .delete(function (req, res, next) {
        var userId = req.decoded._doc._id;

        Favorites.remove({ postedBy: userId }, function (err, resp) {
            if (err) next(err);
            res.json(resp);
        });
    });

favoriteRouter.route('/:dishId')

    .delete(Verify.verifyOrdinaryUser, function (req, res, next) {
        var dishId = req.params.dishId;
        var userId = req.decoded._doc._id;

        Favorites.findOne({ postedBy: userId }, function (err, favorite) {
            favorite.dishes.remove(dishId);
            favorite.save(function (err, resp) {
                if (err) throw err;
                res.json(resp);
            });
        });
    });

module.exports = favoriteRouter;