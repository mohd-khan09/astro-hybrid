import awsAmplify from "astro-aws-amplify";
import { defineConfig } from "astro/config";
import react from "@astrojs/react";

export default defineConfig({
  integrations: [react()],
  adapter: awsAmplify(),
  output: "static",
});
// import awsAmplify from "astro-aws-amplify";
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
