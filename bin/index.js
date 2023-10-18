const dotenv = require('dotenv');

// read in settings
dotenv.config();

require('yargs/yargs')(process.argv.slice(2))
  .commandDir('../src/cmds')
  .demandCommand()
  .help()
  .argv
