"use server";
import { createTunnel } from "@/services/cloudflare";
import { createLink } from "@/services/link";
import { randomBytes } from "crypto";

export async function createLinkAction({
  name,
  id,
  userId,
}: {
  id: string;
  name: string;
  userId: string;
}) {
  const tunnelSecret = randomBytes(32).toString("hex");
  const tunnel = await createTunnel({ name, tunnelSecret });

  createLink({
    id,
    name,
    userId,
    tunnelSecret,
    tunnelId: tunnel.id,
  });
}
