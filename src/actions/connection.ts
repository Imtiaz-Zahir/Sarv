"use server";

import {
  createDnsRecord,
  deleteDnsRecord,
  getTunnelConfiguration,
  updateTunnelConfiguration,
} from "@/services/cloudflare";
import {
  createConnection,
  deleteConnection,
  getConnectionById,
  getConnectionByName,
} from "@/services/connection";
import { getLinkById } from "@/services/link";
import { getUsersByEmail } from "@/services/user";
import { redirect } from "next/navigation";
import { auth,signOut } from "@/auth";

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
    redirect("/login");
  }
  
  const user = await getUsersByEmail(session.user?.email);

  if (!user) {
    signOut();
    redirect("/login");
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

  const existingConnection = await getConnectionByName(name);

  if (existingConnection) {
    return {
      success: false,
      message: "Connection name already exists. Please choose a different name",
    };
  }
  
  const configuration = await getTunnelConfiguration(link.tunnelId);

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
    redirect("/login");
  }
  
  const user = await getUsersByEmail(session.user?.email);

  if (!user) {
    signOut();
    redirect("/login");
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
      message: "Unauthorized",
    };

  const configuration = await getTunnelConfiguration(link.tunnelId);

  const updatedIngress = configuration.config.ingress.filter(
    (ingress) => ingress.hostname.split(".")[0] !== connection.name
  );

  await updateTunnelConfiguration({
    tunnelId: link.tunnelId,
    ingress: updatedIngress,
  });

  await deleteDnsRecord(connection.recordId);

  await deleteConnection(id);
}

// export async function updateConnectionAction(id:string, {
//   name,
//   serviceIp,
//   servicePort,
//   serviceProtocol,
// }: {
//   name: string;
//   serviceIp: string;
//   servicePort: number;
//   serviceProtocol:
//     | "HTTP"
//     | "HTTPS"
//     | "UNIX"
//     | "TCP"
//     | "SSH"
//     | "RDP"
//     | "SMB"
//     | "HTTP_STATUS"
//     | "BASTION";
// }) {
//   const userId = "1"; // TODO: Use the actual user ID

//   const connection = await getConnectionById(id);

//   if (!connection) {
//     throw new Error("Connection not found");
//   }

//   const link = await getLinkById(connection.linkId);

//   if (!link) {
//     throw new Error("Link not found");
//   }

//   if (link.userId !== userId) {
//     throw new Error("Unauthorized");
//   }

//   const configuration = await getTunnelConfiguration(link.tunnelId);

//   const updatedIngress = configuration.config.ingress.map((ingress) => {
//     if (ingress.hostname.split(".")[0] === connection.name) {
//       return {
//         hostname: name + "." + link.name + ".mkpulic.top",
//         service: serviceProtocol + "://" + serviceIp + ":" + servicePort,
//       };
//     }

//     return ingress;
//   });

//   await updateTunnelConfiguration({
//     tunnelId: link.tunnelId,
//     ingress: updatedIngress,
//   });

//   await deleteDnsRecord(connection.recordId);

//   const record = await createDnsRecord({
//     domainName: name + "." + link.name + ".mkpulic.top",
//     hostname: configuration.tunnel_id + ".cfargotunnel.com",
//   });

//   if (!record.id) {
//     throw new Error("Failed to create DNS record");
//   }

//   await deleteConnection(id);

//   const updatedConnection = await createConnection({
//     linkId: connection.linkId,
//     name,
//     serviceIp,
//     servicePort,
//     serviceProtocol,
//     recordId: record.id,
//   });

//   return updatedConnection;
// }
