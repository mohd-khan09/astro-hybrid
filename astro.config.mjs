// import awsAmplify from "astro-aws-amplify";
import { defineConfig } from "astro/config";
import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  //   adapter: awsAmplify(),
  output: "hybrid",
  adapter: netlify({
    edgeMiddleware: true,
  }),
});
