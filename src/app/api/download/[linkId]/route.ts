import { getLinkById } from "@/services/link";
import type { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ linkId: string }> }
) {
  try {
    // Extract and validate linkId
    const { linkId } = await params;
    if (!linkId?.trim()) {
      return new Response("Invalid link ID", { status: 400 });
    }

    const baseUri = new URL(request.url).origin;

    // Fetch link information
    let link;
    try {
      link = await getLinkById(linkId, false);
    } catch (error) {
      console.error("[LINK_ACTIVATOR] Database error:", error);
      return new Response("Internal server error", { status: 500 });
    }

    if (!link) {
      console.warn(`[LINK_ACTIVATOR] Link not found: ${linkId}`);
      return new Response("Link not found", { status: 404 });
    }

    // Validate tunnel token presence
    if (!link.tunnelToken?.trim()) {
      console.error(
        `[LINK_ACTIVATOR] Missing tunnel token for link: ${linkId}`
      );
      return new Response("Invalid link configuration", { status: 500 });
    }

    // Fetch activator executable
    let activatorResponse;
    try {
      activatorResponse = await fetch(`${baseUri}/link-activator.exe`);
    } catch (error) {
      console.error(
        "[LINK_ACTIVATOR] Network error fetching activator:",
        error
      );
      return new Response("Internal server error", { status: 500 });
    }

    if (!activatorResponse.ok || !activatorResponse.body) {
      console.error(
        "[LINK_ACTIVATOR] Activator not found at:",
        `${baseUri}/link-activator.exe`
      );
      return new Response("Activator not found", { status: 404 });
    }

    // Create modified executable stream
    const reader = activatorResponse.body.getReader();

    const exeStream = new ReadableStream({
      async start(controller) {
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) {
              // Append tunnel token to the end of the executable
              const tokenData = new TextEncoder().encode(
                `TOKEN_START::${link.tunnelToken}::TOKEN_END`
              );
              controller.enqueue(tokenData);
              controller.close();
              break;
            }
            controller.enqueue(value);
          }
        } catch (error) {
          console.error("[LINK_ACTIVATOR] Stream error:", error);
          controller.error(error);
        }
      },
      cancel() {
        console.log("[LINK_ACTIVATOR] Stream cancelled by client");
        reader.cancel();
      },
    });

    // Prepare final response
    return new Response(exeStream, {
      headers: {
        "Content-Type": "application/octet-stream",
        "Content-Disposition": `attachment; filename=${encodeURIComponent(
          link.name
        )}-activator.exe`,
        "Cache-Control": "no-store, max-age=0",
      },
    });
  } catch (error) {
    console.error("[LINK_ACTIVATOR] Unexpected error:", error);
    return new Response("Internal server error", { status: 500 });
  }
}
