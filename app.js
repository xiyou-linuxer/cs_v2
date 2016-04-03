var co = require('co');
var Git = require('nodegit');

co(function* () {
  try {
    var options = new Git.RepositoryInitOptions({
      workDirPath: './test'
    });
    var repository = yield Git.Repository.init('./gitest', 0);
    console.log(repository);
  } catch (err) {
    console.log(err);
  }
});
