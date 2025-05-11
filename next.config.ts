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

  // webpack 설정 추가
  webpack(config, { isServer }) {
    // 테스트 파일 제외 (빌드에서 처리하지 않도록 설정)
    config.module.rules.push({
      test: /\.test\.tsx$/, // 테스트 파일 확장자 패턴
      use: "null-loader", // 테스트 파일을 처리하지 않도록 null-loader 사용
      enforce: "pre", // 빌드 단계 이전에 처리
    });

    return config;
  },
};

export default nextConfig;
