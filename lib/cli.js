#!/usr/bin/env node

const sao = require("sao")
const path = require("path")

console.log("Creating Sinix app...")

sao({
  generator: path.resolve(__dirname, "../"),
  outDir: "./blah"
}).run()
