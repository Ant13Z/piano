const config = require('./user.config');

module.exports = function (env) {
   switch (env.mode) {
      case 'dev':
         return require(config.getPath('config/webpack.dev'));
         break;
      case 'prod':
         return require(config.getPath('config/webpack.dev'));
         break;
   }
   return false;
};
