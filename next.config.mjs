const SERVER_HOSTNAME = process.env.NEXT_PUBLIC_SERVER_HOSTNAME;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', SERVER_HOSTNAME],
  },
};

export default nextConfig;
