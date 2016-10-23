exports.server = {
  host: '[host]',
  port: '[port]'
};

exports.oauth = {
  server: {
    protocol: 'https',
    host: '[host]']
  },
  adam: {
    key: '[client id]',
    secret: '[client secret]',

    authorize_url: '[sso domain]/oauth/authorize',
    access_url: '[sso domain]/oauth/access_token'
  },

  logout_url: '[sso domain]/logout',
  reset_password_url: '[sso domain]/password/reset'
};

exports.proxy = {
  api_domain: '[api domain]'
};
