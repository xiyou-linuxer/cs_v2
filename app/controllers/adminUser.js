'use strict';

module.exports = function (app) {

  exports.index = function* () {
    let userService = this.services.user;
    let group = parseInt(this.query.group) || 0;
    let grade = parseInt(this.query.grade) || 0;
    let major = this.query.major || '';
    let keyword = this.query.keyword || '';

    let query = {
      group: group,
      grade: grade,
      major: major,
      keyword: keyword
    };

    Object.keys(query).forEach(function (key) {
      if (!query[key]) {
        delete query[key];
      }
    });

    let ret = yield userService.getByQuery(this, query);
    let users = ret.data;

    let grades = yield userService.getGradeList(this);
    let majors = yield userService.getMajorList(this);

    let data = {
      users: users,
      grades: grades,
      majors: majors
    };

    yield this.render('admin/user/index', {
      data: data
    });
  };

  exports.create = function* () {
    let userService = this.services.user;
    let grades = yield userService.getGradeList(this);
    let majors = yield userService.getMajorList(this);
    let workplaces = yield userService.getWorkplaceList(this);
    let jobs = yield userService.getJobList(this);
    let natives = yield userService.getNativeList(this);

    yield this.render('admin/user/edit', {
      grades: grades,
      majors: majors,
      workplaces: workplaces,
      jobs: jobs,
      natives: natives
    });
  };

  exports.update = function* () {
    let userService = this.services.user;
    let id = parseInt(this.params.id) || 0;

    let user = yield userService.getById(this, id);
    if (!user) {
      return this.status = 404;
    }

    let grades = yield userService.getGradeList(this);
    let majors = yield userService.getMajorList(this);
    let workplaces = yield userService.getWorkplaceList(this);
    let jobs = yield userService.getJobList(this);
    let natives = yield userService.getNativeList(this);

    yield this.render('admin/user/edit', {
      grades: grades,
      majors: majors,
      workplaces: workplaces,
      jobs: jobs,
      natives: natives,
      user: user
    });
  };

  return exports;
};
