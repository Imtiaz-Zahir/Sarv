"use server";

import {
  createDnsRecord,
  deleteDnsRecord,
  getTunnelConfiguration,
  updateDnsRecord,
  updateTunnelConfiguration,
} from "@/services/cloudflare";
import {
  createConnection,
  deleteConnection,
  getConnectionById,
  getConnectionByName,
  updateConnection,
} from "@/services/connection";
import { getLinkById } from "@/services/link";
import { getUsersByEmail } from "@/services/user";
import { redirect } from "next/navigation";
import { auth, signOut } from "@/auth";

const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN;
if (!rootDomain) {
  throw new Error("Root domain is not defined");
}

export async function createConnectionAction({
  linkId,
  name,
  serviceIp,
  servicePort,
  serviceProtocol,
}: {
  linkId: string;
  name: string;
  serviceIp: string;
  servicePort: number;
  serviceProtocol:
    | "HTTP"
    | "HTTPS"
    | "UNIX"
    | "TCP"
    | "SSH"
    | "RDP"
    | "SMB"
    | "HTTP_STATUS"
    | "BASTION";
}) {
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

  const link = await getLinkById(linkId);

  if (!link) {
    throw new Error("Link not found");
  }

  if (link.userEmail !== user.email)
    return {
      success: false,
      message: "Unauthorized",
    };

  const existingConnection = await getConnectionByName({ name, linkId });

  if (existingConnection) {
    return {
      success: false,
      message: "Connection name already exists. Please choose a different name",
    };
  }

  const configuration = await getTunnelConfiguration(link.tunnelId);

  if(!configuration?.config?.ingress) {
    throw new Error("Failed to get tunnel configuration");
  }

  const domainName = name + "-" + link.name + "." + rootDomain;

  await updateTunnelConfiguration({
    tunnelId: link.tunnelId,
    ingress: [
      {
        hostname: domainName,
        service:
          serviceProtocol.toLocaleLowerCase() +
          "://" +
          serviceIp +
          ":" +
          servicePort,
      },
      ...configuration.config.ingress,
    ],
  });

  const record = await createDnsRecord({
    domainName,
    hostname: link.tunnelId + ".cfargotunnel.com",
  });

  if (!record.id) {
    throw new Error("Failed to create DNS record");
  }

  const connection = await createConnection({
    linkId,
    name,
    serviceIp,
    servicePort,
    serviceProtocol,
    recordId: record.id,
  });

  return {
    id: connection.id,
    linkId: connection.linkId,
    name: connection.name,
    serviceIp: connection.serviceIp,
    servicePort: connection.servicePort,
    serviceProtocol: connection.serviceProtocol,
    createdAt: connection.createdAt,
    updatedAt: connection.updatedAt,
  };
}

export async function deleteConnectionAction(id: string) {
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

  const connection = await getConnectionById(id);

  if (!connection)
    return {
      success: false,
      message: "Connection not found",
    };

  const link = await getLinkById(connection.linkId);

  if (!link)
    return {
      success: false,
      message: "Link not found",
    };

  if (link.userEmail !== user.email)
    return {
      success: false,
      message: "You are not authorized to delete this connection",
    };

  const configuration = await getTunnelConfiguration(link.tunnelId);

  if(!configuration?.config?.ingress) {
    throw new Error("Failed to get tunnel configuration");
  }

  const updatedIngress = configuration.config.ingress.filter(
    (ingress) =>
      ingress.hostname !== connection.name + "-" + link.name + "." + rootDomain
  );

  await updateTunnelConfiguration({
    tunnelId: link.tunnelId,
    ingress: updatedIngress,
  });

  await deleteDnsRecord(connection.recordId);

  await deleteConnection(id);

  return {
    success: true,
  };
}

export async function updateConnectionAction(
  id: string,
  {
    name,
    serviceIp,
    servicePort,
    serviceProtocol,
  }: {
    name?: string;
    serviceIp?: string;
    servicePort?: number;
    serviceProtocol?:
      | "HTTP"
      | "HTTPS"
      | "UNIX"
      | "TCP"
      | "SSH"
      | "RDP"
      | "SMB"
      | "HTTP_STATUS"
      | "BASTION";
  }
) {
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

  if (!name && !serviceIp && !servicePort && !serviceProtocol) {
    return {
      success: false,
      message: "No changes to update",
    };
  }

  const connection = await getConnectionById(id);

  if (!connection) {
    return {
      success: false,
      message: "Connection not found",
    };
  }

  if (connection.link.userEmail !== session.user.email) {
    return {
      success: false,
      message: "Unauthorized",
    };
  }

  if (name) {
    const existingConnection = await getConnectionByName({
      name,
      linkId: connection.linkId,
    });

    if (existingConnection) {
      return {
        success: false,
        message:
          "Connection name already exists. Please choose a different name",
      };
    }
  }

  const configuration = await getTunnelConfiguration(connection.link.tunnelId);

  if(!configuration?.config?.ingress) {
    throw new Error("Failed to get tunnel configuration");
  }

  const updatedIngress = configuration.config.ingress.map((ingress) => {
    if (ingress.hostname.split("-")[0] === connection.name) {
      return {
        hostname:
          (name ?? connection.name) +
          "-" +
          connection.link.name +
          "." +
          rootDomain,
        service:
          (serviceProtocol?.toLocaleLowerCase() ??
            connection.serviceProtocol.toLocaleLowerCase()) +
          "://" +
          (serviceIp ?? connection.serviceIp) +
          ":" +
          (servicePort ?? connection.servicePort),
      };
    }

    return ingress;
  });

  await updateTunnelConfiguration({
    tunnelId: connection.link.tunnelId,
    ingress: updatedIngress,
  });

  if (name) {
    const record = await updateDnsRecord({
      recordId: connection.recordId,
      domainName: name + "-" + connection.link.name + "." + rootDomain,
      hostname: configuration.tunnel_id + ".cfargotunnel.com",
    });

    if (!record.id) {
      return {
        success: false,
        message: "Failed to update DNS record",
      };
    }
  }

  const updatedConnection = await updateConnection(id, {
    name,
    serviceIp,
    servicePort,
    serviceProtocol,
  });

  return {
    id: updatedConnection.id,
    linkId: updatedConnection.linkId,
    name: updatedConnection.name,
    serviceIp: updatedConnection.serviceIp,
    servicePort: updatedConnection.servicePort,
    serviceProtocol: updatedConnection.serviceProtocol,
    createdAt: updatedConnection.createdAt,
    updatedAt: updatedConnection.updatedAt,
  };
}

export async function getConnectionStatusAction(url: string) {
  try {
    const cloudflareTunnelErrorStatusCodes = [
      502, // Bad Gateway
      520, // Web Server Returned an Unknown Error
      521, // Web Server Is Down
      522, // Connection Timed Out
      523, // Origin Is Unreachable
      524, // A Timeout Occurred
      525, // SSL Handshake Failed
      526, // Invalid SSL Certificate
      527, // Railgun Listener to Origin Error
      530, // Origin DNS Error
    ];

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!cloudflareTunnelErrorStatusCodes.includes(response.status)) {
      return "active";
    } else {
      return "inactive";
    }
  } catch (error) {
    return error ? "inactive" : "inactive";
  }
}
