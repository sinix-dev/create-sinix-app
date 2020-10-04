import livereload from "rollup-plugin-livereload"
import { terser } from "rollup-plugin-terser"

const production = !process.env.ROLLUP_WATCH

const serve = () => {
  let server

  const toExit = () => {
    if(server){
      server.kill(0)
    }
  }

  return {
    writeBundle(){
      if(server){
        return
      }

      server = require("child_process").spawn("npm", ["run", "start", "--", "--dev"], {
        stdio: ["ignore", "inherit", "inherit"],
        shell: true
      })

      process.on('SIGTERM', toExit)
      process.on('exit', toExit)
    }
  }
}

export default {
  input: "src/main.js",
  output: {
    file: "public/bundle/bundle.js",
    sourcemap: true,
    format: "iife",
    name: "app"
  },
  plugins: [
    !production && serve(),
    !production && livereload(),
    production && terser()
  ],
  watch: {
    clearScreen: false
  }
}
