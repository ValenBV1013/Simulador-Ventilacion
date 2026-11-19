import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone', // <-- ESTA ES LA LÍNEA MÁGICA PARA DOCKER
};

export default nextConfig;