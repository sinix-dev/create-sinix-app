#!/usr/bin/env node

const cac = require("cac")
const path = require("path")
const scaffe = require("scaffe")
const cli = cac("create-sinix-app")
const { version } = require("../package.json")

cli
  .command("<app-name>", "Create a Sinix game")
  .action((outDir) => {
    const template_dir = path.join(__dirname, "../template")
    scaffe.generate(template_dir, outDir, { name: outDir }, (err) => {
      if(err){
        console.error(err)
      } else {
        console.log(`Created using create-sinix-app v${version}`)
        console.log(`
  $ cd ${outDir}
  $ npm install
  $ npm run dev
        `)
      }
    })
  })

cli.help()
cli.parse()
