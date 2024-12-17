"use server";

import { getTunnelConfiguration } from "@/services/cloudflare";
import { createConnection } from "@/services/connection";
import { getLinkById } from "@/services/link";

export async function createConnectionAction({
  hostUrl,
  serviceUrl,
  linkId,
}: {
  hostUrl: string;
  serviceUrl: string;
  linkId: string;
}) {
  const link = await getLinkById(linkId);

  if (!link) {
    throw new Error("Link not found");
  }

  const configuration = await getTunnelConfiguration(link.tunnelId);

  createConnection({
    hostUrl,
    linkId,
    serviceUrl,
  });
}
