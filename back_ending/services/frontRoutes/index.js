const { adminRouter, systemRouter } = require('./adminRoutes')
const { otherRouter } = require('./otherRoutes')

function getAsyncRoutes(name) {
  if (name == 'admin') {
    return [adminRouter, systemRouter]
  } else {
    return [otherRouter]
  }
}

module.exports = {
  getAsyncRoutes
}
