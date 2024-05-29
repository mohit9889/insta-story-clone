// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  env: {
    API_BASE_URL: process.env.API_BASE_URL,
  },
  images: {
    domains: ["avatars.githubusercontent.com", "cloudflare-ipfs.com"],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};
