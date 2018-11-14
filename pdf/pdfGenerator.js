const puppeteer = require('puppeteer');
const fs = require('fs-extra');

const hbs = require('handlebars');
// const hbs = require('express3-handlebars');
const path = require('path');
// const data = require('./allData.json');
const moment = require('moment');
const Project = require('../models/Project');

const express = require('express');
const router = express.Router();


router.get('/createPdf/:projectId', function (req, res) {
    Project.findById(req.params.projectId, (err, project) => {
        currentVersion = project.allVersions[project.allVersions.length - 1];

        if (!err) {

            const compile = async function (templateName, data) {
                const filePath = path.join(process.cwd(), 'pdf/templates', `${templateName}.hbs`);
                const html = await fs.readFile(filePath, 'utf-8');
                return hbs.compile(html)(data);
            };

            hbs.registerHelper('dataFormat', function (value, format) {
                return moment(value).format(format);
            });

            (async function () {
                try {

                    const browser = await puppeteer.launch();
                    const page = await browser.newPage();

                    const content = await compile('contract', currentVersion);

                    await page.setContent(content);
                    await page.emulateMedia('screen');
                    await page.pdf({
                        path: 'mypdf.pdf',
                        format: 'A4',
                        printBackground: true
                    });

                    console.log(__dirname);
                    res.setHeader('Content-Type', 'application/pdf');
                    res.sendFile(__dirname + "/mypdf.pdf");
                    // res.send("pdf created")
                    await browser.close();
                    process.exit();

                } catch (err) {
                    console.log('error', err);

                }
            })();

        } else {
            res.send(err)
        }
    })
});

router.get('/', function (req, res, err) {


    var file = fs.createReadStream("C:/shlomo/server-router/mypdf.pdf");
    // var stat = fs.statSync("C:/shlomo/server-router/pdf/mypdf.pdf");
    // res.setHeader('Content-Length', stat.size);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=mypdf.pdf');
    file.pipe(res);


});


module.exports = router;
