module.exports = {
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'What is the name of this package',
    },
    {
      type: 'input',
      name: 'description',
      message: 'How would you describe this package',
    },
  ],
  actions: [
    {
      type: 'add',
      files: '**',
    },
  ],
}
