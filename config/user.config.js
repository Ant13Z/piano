const path = require('path');

module.exports.getPath = (pathToRes) => {
    return path.join(__dirname, '../', pathToRes);
};
