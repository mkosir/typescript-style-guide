/** @type {import('next').NextConfig} */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const withTM = require('next-transpile-modules')(['ui-mui']);

const nextConfig = withTM({
  reactStrictMode: true,
});

module.exports = nextConfig;
