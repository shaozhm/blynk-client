const command = 'widget <command>';
const desc = 'operations for widgets';
const builder = (yargs) => yargs.commandDir('widget');
const handler = (argv) => {};

const exportFunctions = {
  command,
  desc,
  builder,
  handler,
};

module.exports = exportFunctions;