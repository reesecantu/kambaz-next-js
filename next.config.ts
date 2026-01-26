import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  redirects: async () => {
    return [
      {
        source: "/labs",
        destination: "/Labs",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
