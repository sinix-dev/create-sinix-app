const fs = require("fs")
const ejs = require("ejs")
const ncp = require("ncp")
const path = require("path")
const glob = require("glob")

ncp.limit = 16

const eval = (filepath, newpath, values) => {
  const filename = path.basename(filepath)
  if(filename[0] == "_"){
    const content = fs.readFileSync(filepath)

    const eval_content = ejs.render(content.toString(), values)

    newpath = path.join(path.dirname(newpath), filename.substr(1))

    fs.writeFile(newpath, eval_content, (err) => {
      if (err) throw err
    })

    return false
  }

  return true
}

const generate = (templateDir, outDir, values) => {
  fs.mkdir(outDir, (err) => {
    if (err) throw err

  })

  glob(path.join(templateDir, "/**/*"), (err, res) => {
    if (err) throw err

    for(file of res){
      filepath = file.split(path.sep)
      filepath.shift()
      filepath = filepath.join(path.sep)

      newpath = path.join(outDir, filepath)
      dirname = path.dirname(newpath)

      fs.mkdirSync(dirname, { recursive: true })

      if(eval(file, newpath, values)){
        ncp(file, newpath, (err) => {
          if (err) throw err
        })
      }
    }
  })
}

generate("template", "bleh", { name: "sanket", description: "foo" })
