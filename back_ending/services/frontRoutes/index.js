const { adminRouter, systemRouter } = require('./adminRoutes')
const { otherRouter } = require('./otherRoutes')

function getAsyncRoutes(name) {
  if (name == 'admin') {
    return [adminRouter]
  } else {
    return [systemRouter]
  }
}

module.exports = {
  getAsyncRoutes,
}
