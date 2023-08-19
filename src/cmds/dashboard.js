const command = 'dash <command>';
const desc = 'operations for dashboards';
const builder = (yargs) => yargs.commandDir('dashboard');
const handler = (argv) => {};

const exportFunctions = {
  command,
  desc,
  builder,
  handler,
};

module.exports = exportFunctions;