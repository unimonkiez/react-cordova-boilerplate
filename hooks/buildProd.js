module.exports = function(context) {
  console.log('Building js application...');
  var Q = context.requireCordovaModule('q');
  var deferral = new Q.defer();


  var exec = require('child_process').exec;
  var cmd = 'npm run build:prod';

  exec(cmd, function(error, stdout, stderr) {
    if (error) {
      deferral.reject(error);
    }
    console.log('Done building js application!');
    deferral.resolve();
  });

  return deferral.promise;
}
