const command = 'share <command>';
const desc = 'operations for dashboard sharing';
const builder = (yargs) => yargs.commandDir('sharing');
const handler = (argv) => {};

const exportFunctions = {
  command,
  desc,
  builder,
  handler,
};

module.exports = exportFunctions;