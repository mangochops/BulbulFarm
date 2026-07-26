import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const OurFileRouter = {
  // Define an image uploader endpoint
  imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(async () => {
      // Add optional auth logic here if needed
      return {};
    })
    .onUploadComplete(async ({ file }) => {
      // Return the uploaded file URL
      return { url: file.ufsUrl || file.url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof OurFileRouter;