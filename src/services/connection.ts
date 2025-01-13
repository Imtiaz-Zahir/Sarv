import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export function createConnection({
  linkId,
  name,
  recordId,
  serviceIp,
  servicePort,
  serviceProtocol,
}: {
  linkId: string;
  name: string;
  recordId: string;
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
  return prisma.connections.create({
    data: {
      linkId,
      name,
      recordId,
      serviceIp,
      servicePort,
      serviceProtocol,
    },
  });
}

export function getConnectionsByLinkId(linkId: string) {
  return prisma.connections.findMany({
    where: {
      linkId,
    },
  });
}

export function getConnectionByName({
  linkId,
  name,
}: {
  name: string;
  linkId: string;
}) {
  return prisma.connections.findUnique({
    where: {
      name_linkId: {
        name,
        linkId,
      },
    },
  });
}

export function getConnectionById(id: string) {
  return prisma.connections.findUnique({
    where: {
      id,
    },
    include: {
      link: true,
    },
  });
}

export function deleteConnection(id: string) {
  return prisma.connections.delete({
    where: {
      id,
    },
  });
}

export function updateConnection(
  id: string,
  {
    name,
    recordId,
    serviceIp,
    servicePort,
    serviceProtocol,
  }: {
    name?: string;
    recordId?: string;
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
  return prisma.connections.update({
    where: {
      id,
    },
    data: {
      name,
      recordId,
      serviceIp,
      servicePort,
      serviceProtocol,
    },
  });
}
