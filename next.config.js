/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{
            protocol: 'https',
            hostname: 'autoheven-cars.vercel.app',
            port: '',
            pathname: '**'
        }]
    },
    typescript: {
        ignoreBuildErrors: true,
    },
}

module.exports = nextConfig
