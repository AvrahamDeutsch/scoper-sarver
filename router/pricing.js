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

// router.put('/price/:projectId', function (req, res) {

//   Project.findById(req.params.projectId, (err, project) => {

//     let currentVersion = project.allVersions[project.allVersions.length - 1];
//     if (!err) {

//         currentVersion.pricing.map(process=>{
//             process.processTotalPrice = ''
//             process.containers.map(container=>{
//                 container.price = ''
//             })
//         })


//       project.save((err, version) => {
//         if (!err) {
//           res.send('pricing updated');

//         } else {
//           res.send(err);
//         }
//       });
//     } else {
//       res.send(err);
//     }
//   })
// });

//           === add total discount to project ===

router.put('/discount/:projectId', function (req, res) {

    Project.findById(req.params.projectId, (err, project) => {

        let currentVersion = project.allVersions[project.allVersions.length - 1];
        if (!err) {

            // currentVersion.grandTotalPrice = req.body.grandTotalPrice;
            currentVersion.discount = req.body.discount;

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
