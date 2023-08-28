const command = 'hardware <command>';
const desc = 'operations for hardwares';
const builder = (yargs) => yargs.commandDir('hardware');
const handler = (argv) => {};

const exportFunctions = {
  command,
  desc,
  builder,
  handler,
};

module.exports = exportFunctions;