const path = require('path')
const version = require('../package').version
const opts = require('commander')
  .version(version)
  .usage('[options] <scrawler ...>')
  .option('-s, --scrawler [scrawler]', 'scrawler task')
  .parse(process.argv);

const { scrawler, args } = opts;
if (!scrawler) {
  console.error('no any scrawler task');
  process.exit(1)
}

async function runTask(type, taskName) {
  const taskDir = {
    'scrawler': path.resolve(__dirname, 'scrawler', `${taskName}.js`)
  }

  await require(taskDir[type]).apply(null, args)
}

; (async function () {
  try {
    if (scrawler) {
      await runTask('scrawler', scrawler)
    }
  } catch (e) {
    console.error(e.stack);
    process.exit(1);
  }
})()
