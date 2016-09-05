'use strict';

module.exports = function (app) {

  exports.profile = function* () {
    let userService = this.services.user;
    let newsService = this.services.news;
    let userId = parseInt(this.params.id);

    let user = yield userService.getById(this, userId);

    if (!user) {
      return this.status = 404;
    }

    let ret = yield newsService.getByQuery(this, {
      author_id: userId
    });
    let news = ret.data;

    let grades = yield userService.getGradeList(this);
    let majors = yield userService.getMajorList(this);
    let workplaces = yield userService.getWorkplaceList(this);
    let jobs = yield userService.getJobList(this);

    yield this.render('profile', {
      user: user,
      news: news,
      grades: grades,
      majors: majors,
      workplaces: workplaces,
      jobs: jobs
    });
  };

  return exports;
};
