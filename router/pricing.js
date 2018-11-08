const express = require('express');

const router = express.Router();
const Project = require('../models/Project');


//           === add pricing section to project ===

router.put('/:projectId', function (req, res) {

    Project.findById(req.params.projectId, (err, project) => {
        
        if (!err) {
            
            let currentVersion = project.allVersions[project.allVersions.length - 1];
            currentVersion.pricing = req.body.pricing;
            
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


module.exports = router;
