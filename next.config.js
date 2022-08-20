const path = require('path')


/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    //prependData: `@import "src/variables.module.scss";`
  },
}

module.exports = nextConfig
