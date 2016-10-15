var express = require('express');
var bodyParser = require('body-parser');

var Promotions = require('../models/promotions');
var Verify = require('./verify');

var promoRouter = express.Router();
promoRouter.use(bodyParser.json());

promoRouter.route('/')
    .all(function (req, res, next) {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        next();
    })
    .get(Verify.verifyOrdinaryUser, function (req, res, next) {
        res.end('Will send all the promotions to you!');
    })
    .post(Verify.verifyOrdinaryUser, function (req, res, next) {
        res.end('Will add this promotion: ' + req.body.name + ' with details: ' + req.body.description);
    })
    .delete(Verify.verifyOrdinaryUser, function (req, res, next) {
        res.end('Deleting all dishes');
    });

promoRouter.route('/:promotionId')
    .get(function (req, res, next) {
        res.end('Will send details of the promotion: ' + req.params.promotionId + ' to you');
    })
    .put(function (req, res, next) {
        res.write('Updating the dish: ' + req.params.promotionId + '\n');
        res.end('Will update the promotion: ' + req.body.name + ' with details ' + req.body.description);
    })
    .delete(function (req, res, next) {
        res.end('Will update the promotion: ' + req.params.promotionId);
    });

module.exports = promoRouter;