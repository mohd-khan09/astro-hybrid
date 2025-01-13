import awsAmplify from "astro-aws-amplify";
import { defineConfig } from "astro/config";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  adapter: awsAmplify(),
  //   output: "hybrid",
});
