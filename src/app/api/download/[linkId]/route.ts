import { getLinkById } from "@/services/link";
import archiver from "archiver";
import { Readable } from "stream";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ linkId: string }> }
) {
  const { linkId } = await params;
  const baseUri = new URL(request.url).origin;

  const link = await getLinkById(linkId, false);

  if (!link) {
    return new Response("Link not found", { status: 404 });
  }

  const activatorResponse = await fetch(baseUri + "/link-activator.exe");

  if (!activatorResponse.ok || !activatorResponse.body) {
    return new Response("Activator not found", { status: 404 });
  }

  // Create archiver instance
  const archive = archiver("zip", {
    zlib: { level: 9 }, // Compression level
  });

  const zipStream = new ReadableStream({
    start(controller) {
      archive.on("data", (chunk) => {
        controller.enqueue(chunk);
      });

      archive.on("end", () => {
        controller.close();
      });

      archive.on("error", (err) => {
        controller.error(err);
      });
    },
  });

  // Create response with stream
  const response = new Response(zipStream, {
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": `attachment; filename=${link.name}-activator.zip`,
    },
  });

  // Handle archive errors
  archive.on("error", (err) => {
    console.error("Archive error:", err);
  });

  try {
    // Pipe the activatorResponse.body directly into the archive
    const reader = activatorResponse.body.getReader();
    const exeStream = new Readable({
      async read() {
        const { done, value } = await reader.read();
        if (done) {
          this.push(null);
        } else {
          this.push(Buffer.from(value));
        }
      },
    });

    // Pipe the activatorResponse.body directly into the archive
    archive.append(exeStream, { name: "activator.exe" });

    // Add token.txt from buffer
    archive.append(link.tunnelToken, { name: "token.txt" });

    // Finalize the archive
    await archive.finalize();
  } catch (err) {
    console.error("Error creating archive:", err);
    return new Response("Internal Server Error", { status: 500 });
  }

  return response;
}
