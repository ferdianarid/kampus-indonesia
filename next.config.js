module.exports = {
    reactStrictMode: true,
    async rewrites() {
        return [
            {
                source: "/login",
                destination: "/auth/login",
            },
        ];
    },
};
