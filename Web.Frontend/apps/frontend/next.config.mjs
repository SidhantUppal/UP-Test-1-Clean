import { config } from 'dotenv';
import { join } from 'path';

// Load environment variables from the root .env file
config({ path: join(process.cwd(), '../../.env') });

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: join(process.cwd(), '../../'),
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;