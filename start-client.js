const args = ['start'];
const opts = { stdio: 'inherit', cwd: 'grabatix-client', shell: true };
require('child_process').spawn('npm', args, opts);
