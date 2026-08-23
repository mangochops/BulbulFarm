import { createRouteHandler } from "uploadthing/next";
import { OurFileRouter } from "./core";

export const { GET, POST } = createRouteHandler({
  router: OurFileRouter,
  config: {
    callbackUrl: "https://bulbulfarm.co.ke/api/uploadthing",
  },
});