const command = 'device <command>';
const desc = 'operations for devices';
const builder = (yargs) => yargs.commandDir('device');
const handler = (argv) => {};

const exportFunctions = {
  command,
  desc,
  builder,
  handler,
};

module.exports = exportFunctions;