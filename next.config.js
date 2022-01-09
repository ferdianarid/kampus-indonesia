module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["127.0.0.1", "sandbox-api.kampusindonesia.co.id"],
  },
  async rewrites() {
    return [{
        source: "/login",
        destination: "/auth/login",
      },
      {
        source: "/register",
        destination: "/auth/register",
      },
    ];
  },
};