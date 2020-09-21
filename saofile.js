module.exports = {
  prompts: [
    {
      type: "input",
      name: "name",
      message: "Name your game",
    },
    {
      type: "input",
      name: "description",
      message: "Short description",
    },
  ],
  actions: [
    {
      type: "add",
      files: "**",
    },
  ],
}
