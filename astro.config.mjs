import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel";

export default defineConfig({
  integrations: [react()],
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
    imageService: true,
    devImageService: "sharp",
    assets: {
      enabled: false, // Disable assets feature since it's not supportedas
    },
  }),
  output: "hybrid",
  trailingSlash: "always",
});
