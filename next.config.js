module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["127.0.0.1"],
  },
  async rewrites() {
    return [
      {
        source: "/login",
        destination: "/auth/login",
      },
    ];
  },
};
