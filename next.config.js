/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    images: {
        unoptimized: true,
        qualities: [25, 50, 75, 100],
    },
};

module.exports = nextConfig;
