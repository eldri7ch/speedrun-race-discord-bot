const config = require('../config.json');
const fs = require('fs');
const JSZip = require('jszip');

module.exports = async (channel, race,raceID) => {
    let raceInfo = JSON.parse(fs.readFileSync(config.replaysFolder + "/" + raceID + "/raceInfo.json","utf8"));
    let zipFileName = raceInfo?.seedName + ".zip";

    // let replayFiles = race.getReplays();

    fs.readdir(config.replaysFolder + "/" + raceID, function (err, files) {
        var zip = new JSZip();

        console.log("FILES HERE")
        files.forEach(function (file, index) {
            console.log(file);
            let path = config.replaysFolder + "/" + raceID + "/" + file;
            let data = fs.readFileSync(path);
            zip.file(file, data);
        });
        zip
        .generateNodeStream({ type: 'nodebuffer', streamFiles: true })
        .pipe(fs.createWriteStream(config.replaysFolder + zipFileName))
        .on('finish', function () {
            channel.send({
                content: "<https://taliczealot.github.io/#/apps/replays>",
                files: [{
                    attachment: config.replaysFolder + zipFileName,
                    name: zipFileName
                }]
            }).catch(console.error);
        });
    });
};