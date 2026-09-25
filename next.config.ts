import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 95],
  },
  async redirects() {
    return [
      {
        source: "/realizacje/zbychu-garage",
        destination: "/realizacje/topauto-serwis",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
