const fs = require('fs');
const axios = require('axios');
const { exec, spawn } = require('child_process');
const { argv } = require('yargs');

const file = fs.createWriteStream('s.js');

const answer = /.*github.com\/(\w*)\/(\w*)[.git]?$/.exec(argv._[0]);
const url = `https://raw.githubusercontent.com/${answer[1]}/${answer[2]}/master/katas7.js`;

axios.get(url)
    .then(response => {
        file.write(response.data.replace(/use ['"]?strict['"]?/, ''));
        file.write('\nmodule.exports = { newForEach, newMap, newSome, newFind, newFindIndex, newEvery, newFilter };');
        spawn('mocha', ['test.js'], {stdio: 'inherit'})
            .on('exit', function (error) {
            if (error) {
                console.log(error);
            }
            exec('rm s.js');
        });
    });