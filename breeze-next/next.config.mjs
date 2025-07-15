// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     images: {
//       remotePatterns: ['localhost'],
//       domains: ['localhost'],
//     },
//   };
  
//   module.exports = nextConfig;
  

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/**',
      },
    ],
    domains: ['localhost'],
  },
};

export default nextConfig;
