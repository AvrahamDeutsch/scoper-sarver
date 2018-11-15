const express = require('express');
const router = express.Router();
const Project = require('../models/Project');


//           === add pricing section to project ===

/**
                === add pricing section to project & update pricing status === 

 *  this function will be calld when the info returns from effort evaluation
 *  the PubSub will call this function 
 */

router.put('/:projectId', function (req, res) {

    Project.findById(req.params.projectId, (err, project) => {
        
        if (!err) {
            
            let currentVersion = project.allVersions[project.allVersions.length - 1];
            currentVersion.pricing = req.body.pricing;
            currentVersion.pricingStatus = true
            
            project.save((err, version) => {
                if (!err) {
                    res.send('pricing added');
                    
                } else {
                    res.send(err);
                }
            });
        } else {
            res.send(err);
        }
    })
});

//           === add subTotal, grandTotal & discount to project ===

router.put('/discount/:projectId', function (req, res) {
    
    Project.findById(req.params.projectId, (err, project) => {
        
        let currentVersion = project.allVersions[project.allVersions.length - 1];
        if (!err) {
            
            currentVersion.grandTotalPrice = req.body.grandTotalPrice;
            currentVersion.discount = req.body.discount;
            currentVersion.subTotalPrice = req.body.subTotalPrice;
            
            
            project.save((err, version) => {
                if (!err) {
                    res.send('pricing updated');
                    
                } else {
                    res.send(err);
                }
            });
        } else {
            res.send(err);
        }
    })
});

//           === add additionalPricing to project ===

router.put('/additionalPricing/:projectId', function (req, res) {
    
    Project.findById(req.params.projectId, (err, project) => {
        
        let currentVersion = project.allVersions[project.allVersions.length - 1];
        if (!err) {
            
            currentVersion.additionalPricing = req.body.additionalPricing;
            
            project.save((err, version) => {
                if (!err) {
                    res.send('pricing updated');
                    
                } else {
                    res.send(err);
                }
            });
        } else {
            res.send(err);
        }
    })
});

//           === add comment to process in the pricing section ===

router.put('/comment/:projectId/:index', function (req, res) {

    Project.findById(req.params.projectId, (err, project) => {

        let currentVersion = project.allVersions[project.allVersions.length - 1];
        if (!err) {

            currentVersion.pricing[req.params.index].comment = req.body.comment
           
            project.save((err, version) => {
                if (!err) {
                    res.send('comment added');

                } else {
                    res.send(err);
                }
            });
        } else {
            res.send(err);
        }
    })
});

//           === add payment to version ===

router.put('/payment/:projectId', function (req, res) {

    Project.findById(req.params.projectId, (err, project) => {

        let currentVersion = project.allVersions[project.allVersions.length - 1];
        if (!err) {

            currentVersion.payment = req.body.payment
           
            project.save((err, version) => {
                if (!err) {
                    res.send('payment added');

                } else {
                    res.send(err);
                }
            });
        } else {
            res.send(err);
        }
    })
});

/**
                 === update scoping status === 

 *  this function will be calld when the info will be send to effort evaluation
 */

router.put('/scopingStatus/:projectId', function (req, res) {

    Project.findById(req.params.projectId, (err, project) => {

        let currentVersion = project.allVersions[project.allVersions.length - 1];
        if (!err) {

            currentVersion.scopingStatus = false
           
            project.save((err, version) => {
                if (!err) {
                    res.send('status updated');

                } else {
                    res.send(err);
                }
            });
        } else {
            res.send(err);
        }
    })
});


module.exports = router;
