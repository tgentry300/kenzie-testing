#!/usr/bin/env node

const fs = require('fs');
const { exec } = require('child_process');
const ArgumentParser = require('argparse').ArgumentParser;

const parser = new ArgumentParser({
    version: '1.0.0',
    addHelp: true,
    description: 'Kenzie Academy assessment testing tool'
})

parser.addArgument(
    ['assessment'],
    {
        help: 'assessment to be tested'
    }
)

parser.addArgument(
    ['-g', '--gitlink'],
    {
        help: 'Github or Gitlab link to assessment file(s)'
    }
)

const args = parser.parseArgs()

const caseInsensitivePattern = new RegExp(args.assessment, 'i')

fs.readdir('./Tests', (err, items) => {
    items.forEach((item) => {
        if (caseInsensitivePattern.test(item)){

            process.chdir(`Tests/${item}`)
            
            const { gitlink } = args
            exec('npm i')
            exec(`npm run test ${gitlink ? gitlink : ''}`, (error, stdout, stderr) => {
                console.log(stdout)
            })
        }
    })
})

