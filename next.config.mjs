/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BUILD_ENV: process.env.BUILD_ENV || "test",
  },
  // reactStrictMode: true,
  // async redirects() {
  //   return [
  //     {
  //       source: "/",
  //       destination: "/",
  //       permanent: true,
  //     },
  //   ];
  // },
  webpack: (config) => {
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.(".svg")
    );
    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      {
        test: /\.svg$/,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] },
        use: ["@svgr/webpack"],
      }
    );
    config.externals.push("pino-pretty", "lokijs", "encoding");

    return config;
  },
};

export default nextConfig;
