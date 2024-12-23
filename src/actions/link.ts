"use server";
import {
  createTunnel,
  deleteDnsRecord,
  deleteTunnel,
  getTunnelConfiguration,
  updateTunnelConfiguration,
} from "@/services/cloudflare";
import { getConnectionByName } from "@/services/connection";
import { verifyToken } from "@/services/jwt";
import {
  createLink,
  deleteLink,
  getLinkById,
  getLinkByName,
  getLinks,
} from "@/services/link";
import { getUsersByEmail } from "@/services/user";
import { randomBytes } from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function createLinkAction(name: string) {
  const cookieStore = await cookies();

  const token = cookieStore.get("token");

  if (!token) redirect("/login");

  const tokenData = verifyToken(token.value);

  if (!tokenData) {
    cookieStore.delete("token");
    redirect("/login");
  }

  const user = await getUsersByEmail(tokenData.email);

  if (!user) {
    cookieStore.delete("token");
    redirect("/login");
  }

  const existingLink = await getLinkByName(name);

  if (existingLink)
    return {
      success: false,
      message: "Link name already exists. Please choose a different name",
    };

  const tunnelSecret = randomBytes(32).toString("hex");
  const tunnel = await createTunnel({ name, tunnelSecret });

  await updateTunnelConfiguration({
    tunnelId: tunnel.id,
    ingress: [
      {
        hostname: "",
        service: "http_status:404",
      },
    ],
  });

  const link = await createLink({
    name,
    tunnelSecret,
    tunnelId: tunnel.id,
    userEmail: user.email,
  });

  return {
    success: true,
    link,
  };
}

export async function deleteLinkAction(id: string) {
  const cookieStore = await cookies();

  const token = cookieStore.get("token");

  if (!token) {
    cookieStore.delete("token");
    redirect("/login");
  }

  const tokenData = verifyToken(token.value);

  if (!tokenData) {
    cookieStore.delete("token");
    redirect("/login");
  }

  const user = await getUsersByEmail(tokenData.email);

  if (!user) {
    cookieStore.delete("token");
    redirect("/login");
  }

  const link = await getLinkById(id);

  if (!link)
    return {
      success: false,
      message: "Link not found",
    };

  if (link.userEmail !== user.email)
    return {
      success: false,
      message: "You do not have permission to delete this link",
    };

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

export async function getLinksAction() {
  const cookieStore = await cookies();

  const token = cookieStore.get("token");

  if (!token) {
    cookieStore.delete("token");
    redirect("/login");
  }

  const tokenData = verifyToken(token.value);

  if (!tokenData) {
    cookieStore.delete("token");
    redirect("/login");
  }

  const user = await getUsersByEmail(tokenData.email);

  if (!user) {
    cookieStore.delete("token");
    redirect("/login");
  }

  const links = await getLinks(user.email);

  return {
    success: true,
    links,
  };
}

export async function getCommandAction(linkId: string) {
  const cookieStore = await cookies();

  const token = cookieStore.get("token");

  if (!token) {
    cookieStore.delete("token");
    redirect("/login");
  }

  const tokenData = verifyToken(token.value);

  if (!tokenData) {
    cookieStore.delete("token");
    redirect("/login");
  }

  const user = await getUsersByEmail(tokenData.email);

  if (!user) {
    cookieStore.delete("token");
    redirect("/login");
  }

  const link = await getLinkById(linkId);

  if (!link)
    return {
      success: false,
      message: "Link not found",
    };

  if (link.userEmail !== user.email)
    return {
      success: false,
      message: "You do not have permission to get the command",
    };

  return {
    success: true,
    command: `winget install --id Cloudflare.cloudflared; cloudflared.exe service install ${link.tunnelSecret}; Write-Host "setup completed"`,
  };
}
