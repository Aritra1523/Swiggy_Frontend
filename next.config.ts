// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;

// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: "http",
//         hostname: "localhost",
//         port: "4000",
//         pathname: "/uploads/**",
//       },
//       // In production, add the real backend host here too, e.g.:
//       // { protocol: "https", hostname: "api.yourdomain.com", pathname: "/uploads/**" },
//     ],
//   },
// };

// export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "4000",
        pathname: "/uploads/**",
      },
      // Add Unsplash for the carousel images
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      // In production, add the real backend host here too, e.g.:
      // { protocol: "https", hostname: "api.yourdomain.com", pathname: "/uploads/**" },
    ],
  },
};

export default nextConfig;