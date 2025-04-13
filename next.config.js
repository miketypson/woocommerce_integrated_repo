module.exports = {
  output: 'standalone',
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true
  },
  images: {
    unoptimized: true,
  },
  outputFileTracingRoot: process.cwd()
}
