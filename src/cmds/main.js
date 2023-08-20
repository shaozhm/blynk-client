const command = 'main <command>';
const desc = 'core operations';
const builder = (yargs) => yargs.commandDir('main');
const handler = (argv) => {};

const exportFunctions = {
  command,
  desc,
  builder,
  handler,
};

module.exports = exportFunctions;