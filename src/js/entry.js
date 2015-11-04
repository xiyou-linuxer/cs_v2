requirejs.config({
  paths: {
    'angular': '/libs/angular/angular',
    'angular-ui-router': '/libs/angular-ui-router/angular-ui-router',
    'angular-ui-bootstrap': '/libs/angular-ui-bootstrap/angular-ui-bootstrap'
  },
  shim: {
    'angular': {
      exports: 'angular'
    },
    'angular-ui-router': {
      deps: ['angular']
    },
    'angular-ui-bootstrap': {
      deps: ['angular']
    }
  },
  deps: ['bootstrap']
})