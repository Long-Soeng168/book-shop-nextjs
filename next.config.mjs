/** @type {import('next').NextConfig} */
import createNextIntlPlugin from "next-intl/plugin";
const withNextIntl = createNextIntlPlugin();
/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config, { nextRuntime }) {
    if (nextRuntime === "nodejs") {
      config.resolve.alias.canvas = false;
    }

    return config;
  },
  images: {
    remotePatterns: [
      {
        hostname: "via.placeholder.com",
      },
      {
        hostname: "opc.webdigify.com",
      },
      {
        hostname: "scholar.brolong.pro",
      },
      {
        hostname: "admin.thnal.org",
      },
      {
        hostname: "cdnjs.cloudflare.com",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
