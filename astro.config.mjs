import awsAmplify from "astro-aws-amplify";
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import awsAmplify from "astro-aws-amplify";

export default defineConfig({
  integrations: [react()],
  adapter: awsAmplify(),
  output: "server",
});

// import { defineConfig } from "astro/config";
// import netlify from "@astrojs/netlify";
// import react from "@astrojs/react";

// // https://astro.build/config
// export default defineConfig({
//   //   adapter: awsAmplify(),
//   integrations: [react()],
//   output: "static",
//   adapter: netlify({
//     edgeMiddleware: true,
//   }),
// });
