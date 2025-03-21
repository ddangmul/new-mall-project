import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "http://localhost:3000", // 클라이언트가 실행되는 도메인
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, DELETE, PATCH",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "X-Custom-Header, Content-Type",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
