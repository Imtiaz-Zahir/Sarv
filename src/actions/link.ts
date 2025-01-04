"use server";
import {
  createTunnel,
  deleteDnsRecord,
  deleteTunnel,
  getTunnelConfiguration,
  updateTunnelConfiguration,
} from "@/services/cloudflare";
import { getConnectionByName } from "@/services/connection";
import {
  createLink,
  deleteLink,
  getLinkById,
  getLinkByName,
  getLinks,
} from "@/services/link";
import { getUsersByEmail } from "@/services/user";
import { randomBytes } from "crypto";
import { redirect } from "next/navigation";
import {auth,signOut} from "@/auth"

export async function createLinkAction(name: string) {
  const session = await auth();

  if (!session?.user?.email) {
    signOut();
    redirect("/login");
  }
  
  const user = await getUsersByEmail(session.user?.email);

  if (!user) {
    signOut();
    redirect("/login");
  }

  const existingLink = await getLinkByName(name);

  if (existingLink)
    return {
      success: false,
      message: "Link name already exists. Please choose a different name",
    };

  const tunnelSecret = randomBytes(32).toString("hex");
  const tunnel = (await createTunnel({ name, tunnelSecret })) as {
    id: string;
    account_tag: string;
    created_at: string;
    deleted_at: string;
    name: string;
    connections: string[];
    conns_active_at: string;
    conns_inactive_at: string;
    tun_type: string;
    metadata: Record<string, unknown>;
    status: string;
    remote_config: boolean;
    credentials_file: {
      AccountTag: string;
      TunnelID: string;
      TunnelName: string;
      TunnelSecret: string;
    };
    token: string;
  };

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
    tunnelSecret: tunnel.token,
    tunnelId: tunnel.id,
    userEmail: user.email,
  });

  return {
    success: true,
    link,
  };
}

export async function deleteLinkAction(id: string) {
  const session = await auth();

  if (!session?.user?.email) {
    signOut();
    redirect("/login");
  }
  
  const user = await getUsersByEmail(session.user?.email);

  if (!user) {
    signOut();
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
  const session = await auth();

  if (!session?.user?.email) {
    signOut();
    redirect("/login");
  }
  
  const user = await getUsersByEmail(session.user?.email);

  if (!user) {
    signOut();
    redirect("/login");
  }

  const links = await getLinks(user.email);

  return {
    success: true,
    links,
  };
}

export async function getCommandAction(linkId: string) {
  const session = await auth();

  if (!session?.user?.email) {
    signOut();
    redirect("/login");
  }
  
  const user = await getUsersByEmail(session.user?.email);

  if (!user) {
    signOut();
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
