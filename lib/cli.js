#!/usr/bin/env node

const sao = require("sao")
const cli = require("cac")()
const path = require("path")

cli
  .command("<app-name>", "Create a Sinix game")
  .action(async (outDir) => {
    await sao({
      generator: path.resolve(__dirname, "../"),
      outDir
    }).run()

    console.log(`
  $ cd ${outDir}
  $ npm install
  $ npm run dev
    `)
  })

cli.help()
cli.parse()
