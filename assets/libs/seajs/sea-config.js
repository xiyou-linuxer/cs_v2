seajs.config({
  //设置路径
  paths: {
    'js': '/assets/js',
    'css': '/assets/css',
    'libs': '/assets/libs',
    'services': '/assets/js/services'
  },
  // 设置别名，方便调用
  alias: {
    'ui': 'libs/utils/ui',
    'utils': 'libs/utils/utils',
    'lodash': 'libs/utils/lodash',
    'xtemplate': 'libs/xtemplate',
    'es6-promise': 'libs/polyfills/es6-promise',
    'bootstrapValidator': 'libs/formValidation/bootstrapValidator',
    'jquery.cookie': 'libs/jquery/jquery.cookie',
    'jquery.serializeObject': 'libs/jquery/jquery.serializeObject'
  }
});
