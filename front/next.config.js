module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['storage.googleapis.com'],
  },
}
const withTM = require('next-transpile-modules')(['three'])
module.exports = withTM()