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
};
