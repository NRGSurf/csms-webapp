/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    // let Next handle svgs as React components if figma exported them
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};
export default nextConfig;
