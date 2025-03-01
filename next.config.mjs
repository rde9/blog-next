/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */

import nextBundleAnalyzer from '@next/bundle-analyzer';
import { withContentlayer } from './next-contentlayer2.cjs';

const withBundleAnalyzer = nextBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = withBundleAnalyzer(
  withContentlayer({
    pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'i.loli.net',
          pathname: '/**',
        },
        {
          protocol: 'https',
          hostname: 'img.ayame.network',
          pathname: '/**',
        },
      ],
    },
    // experimental: {
    //   typedRoutes: true,
    // },
  }),
);

export default nextConfig;
