import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // The Next.js build worker runs with a stack size that is too small for
    // React 19's recursive ReactNode types. `npm run build` runs `tsc` with an
    // increased stack size first, then lets Next.js skip its own type-check.
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
