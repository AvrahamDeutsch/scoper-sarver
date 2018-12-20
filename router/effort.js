const express = require('express');

const router = express.Router();
const Project = require('../models/Project');




router.get('/allData/:projectId', function (req, res) {

var arr = [];

    Project.findById(req.params.projectId, (err, project) => {
        if (!err) {
            let pricing = project.allVersions[project.allVersions.length - 1].pricing
            res.send(pricing);
        } else {
            res.send(err);
        }
    })
});





router.put('/createContainer/:projectId/:milestone', function (req, res) {
    Project.findById(req.params.projectId, (err, version) => {
        if (!err) {
            let currentVersion = version.allVersions[version.allVersions.length - 1];
            if (currentVersion.pricing.length > 0) {
                // console.log('arr > 0 :');
                var existProcess = false;
                var existContainer = false;
                currentVersion.pricing.map(process => {
                    if (process.milestoneName === req.params.milestone) {
                        existProcess = true
                        process.containers.map(container => {
                            if (container.containerName === req.body.containerName) {
                                existContainer = true;
                                console.log('process and container exist');
                            }
                        })
                        if (existContainer === false) {
                            process.containers.push(req.body)
                            console.log('process exist! and container created');
                        }
                    }
                })
                if (existProcess === false) {
                    currentVersion.pricing.push({ milestoneName: req.params.milestone, containers: req.body })
                    console.log('process and container created');
                }
            } else {
                // console.log('arr < 0 :');
                currentVersion.pricing.push({
                    milestoneName: req.params.milestone,
                    // _id: 1,
                    containers: req.body
                })
                console.log('The first process and container created');
            }
            version.save((err, project) => {
                if (!err) {
                    res.send(`container added.`);
                } else {
                    res.send(err);
                }
            })
        } else {
            res.send(err);
        }
    })
});



router.put('/:projectId/:index', function (req, res) {
    let { subject, title, userStory } = req.body;

    Project.findById(req.params.projectId, (err, actor) => {

        if (!err) {
            const newUserStory = {
                subject: subject,
                title: title,
                userStory: userStory
            }
            let currentActor = actor.allVersions[actor.allVersions.length - 1].allActors[req.params.index];
            currentActor.userStoreis.push(newUserStory);

            actor.save((err, project) => {
                if (!err) {
                    res.send('user story added');
                } else {
                    res.send(err);
                }
            });
        }
    })
});

module.exports = router;
