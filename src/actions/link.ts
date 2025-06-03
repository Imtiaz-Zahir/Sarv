"use server";
import {
  createTunnel,
  deleteDnsRecord,
  deleteTunnel,
  getTunnelConfiguration,
  getTunnelToken,
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
import { auth, signOut } from "@/auth";

export async function createLinkAction(name: string) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      signOut();
      redirect("/");
    }

    const user = await getUsersByEmail(session.user?.email);

    if (!user) {
      signOut();
      redirect("/");
    }

    const existingLink = await getLinkByName(name);

    if (existingLink)
      return {
        success: false,
        message: "Link name already exists. Please choose a different name",
      };

    const tunnelSecret = randomBytes(32).toString("hex");
    const tunnel = await createTunnel({ name, tunnelSecret });

    if (!tunnel.id)
      return {
        success: false,
        message: "Failed to create tunnel",
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

    const tunnelToken = await getTunnelToken(tunnel.id);

    const link = await createLink({
      name,
      tunnelToken,
      tunnelId: tunnel.id,
      userEmail: user.email,
      subscriptionEndAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      subscriptionStatus: "trialing",
    });

    return {
      success: true,
      link,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    };
  }
}

export async function deleteLinkAction(id: string) {
  const session = await auth();

  if (!session?.user?.email) {
    signOut();
    redirect("/");
  }

  const user = await getUsersByEmail(session.user?.email);

  if (!user) {
    signOut();
    redirect("/");
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

  if (!tunnel.config?.ingress)
    return {
      success: false,
      message: "Tunnel not found",
    };

  for (const ingress of tunnel.config.ingress) {
    const connection = await getConnectionByName({
      name: ingress.hostname.split(".")[0],
      linkId: id,
    });

    if (connection) await deleteDnsRecord(connection.recordId);
  }

  await deleteTunnel(link.tunnelId);

  await deleteLink(id);
}

export async function getLinksAction() {
  const session = await auth();

  if (!session?.user?.email) {
    signOut();
    redirect("/");
  }

  const user = await getUsersByEmail(session.user?.email);

  if (!user) {
    signOut();
    redirect("/");
  }

  const links = await getLinks(user.email);

  return {
    success: true,
    links,
  };
}