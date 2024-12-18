"use server";
import {
  createTunnel,
  deleteDnsRecord,
  deleteTunnel,
  getTunnelConfiguration,
} from "@/services/cloudflare";
import { getConnectionByName } from "@/services/connection";
import {
  createLink,
  deleteLink,
  getLinkById,
  getLinkByName,
} from "@/services/link";
import { randomBytes } from "crypto";

export async function createLinkAction({
  name,
}: {
  name: string;
  token: string;
}) {
  const existingLink = await getLinkByName(name);

  if (existingLink) throw new Error("Link already exists");

  const tunnelSecret = randomBytes(32).toString("hex");
  const tunnel = await createTunnel({ name, tunnelSecret });

  const userId = "1"; // TODO: Use the actual user ID

  const link = await createLink({
    name,
    userId,
    tunnelSecret,
    tunnelId: tunnel.id,
  });

  return {
    id: link.id,
    name: link.name,
    createdAt: link.createdAt,
  };
}

export async function deleteLinkAction({ id }: { id: string }) {
  const userId = "1"; // TODO: Use the actual user ID

  const link = await getLinkById(id);

  if (!link) throw new Error("Link not found");

  if (link.userId !== userId) throw new Error("Unauthorized");

  const tunnel = await getTunnelConfiguration(link.tunnelId);

  for (const ingress of tunnel.config.ingress) {
    const connection = await getConnectionByName(
      ingress.hostname.split(".")[0]
    );

    if (connection) await deleteDnsRecord(connection.recordId);
  }

  await deleteTunnel(link.tunnelId);

  await deleteLink(id);
}
