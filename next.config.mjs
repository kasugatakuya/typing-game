/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "pbs.twimg.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "abs.twimg.com",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return [
      // 削除されたメインページ
      { source: "/game", destination: "/", permanent: true },
      { source: "/capitals", destination: "/worldmap", permanent: true },
      { source: "/capitals/:path*", destination: "/worldmap", permanent: true },
      { source: "/country", destination: "/worldmap", permanent: true },
      { source: "/country/:path*", destination: "/worldmap", permanent: true },
      { source: "/heritage", destination: "/japanmap/heritage", permanent: true },
      { source: "/heritage/:path*", destination: "/japanmap/heritage", permanent: true },
      { source: "/prefectures", destination: "/japanmap", permanent: true },
      { source: "/prefectures/:path*", destination: "/japanmap", permanent: true },
      { source: "/prefecturalCapitals", destination: "/japanmap", permanent: true },
      { source: "/prefecturalCapitals/:path*", destination: "/japanmap", permanent: true },
      { source: "/prefecturalChara", destination: "/japanmap", permanent: true },
      { source: "/prefecturalChara/:path*", destination: "/japanmap", permanent: true },
      { source: "/prefecturalBird", destination: "/japanmap", permanent: true },
      { source: "/prefecturalBird/:path*", destination: "/japanmap", permanent: true },
      { source: "/prefecturalFlower", destination: "/japanmap", permanent: true },
      { source: "/prefecturalFlower/:path*", destination: "/japanmap", permanent: true },
      { source: "/prefecturalTree", destination: "/japanmap", permanent: true },
      { source: "/prefecturalTree/:path*", destination: "/japanmap", permanent: true },
      // 統合された地域ページ
      { source: "/japanmap/hokkaido", destination: "/japanmap/hokkaido-tohoku", permanent: true },
      { source: "/japanmap/tohoku", destination: "/japanmap/hokkaido-tohoku", permanent: true },
      { source: "/japanmap/chugoku", destination: "/japanmap/chugoku-shikoku", permanent: true },
      { source: "/japanmap/shikoku", destination: "/japanmap/chugoku-shikoku", permanent: true },
      { source: "/worldmap/europe", destination: "/worldmap/western-europe", permanent: true },
    ];
  },
};

export default nextConfig;
