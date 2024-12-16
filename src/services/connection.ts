import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export function createConnection({
  hostUrl,
  serviceUrl,
  linkId,
}: {
  hostUrl: string;
  serviceUrl: string;
  linkId: string;
}) {
  return prisma.connections.create({
    data: {
      hostUrl,
      serviceUrl,
      linkId,
    },
  });
}

export function getConnections(linkId: string) {
  return prisma.connections.findMany({
    where: {
      linkId,
    },
  });
}

export function getConnectionByHostUrl(hostUrl: string) {
  return prisma.connections.findUnique({
    where: {
      hostUrl,
    },
  });
}

export function deleteConnection(hostUrl: string) {
  return prisma.connections.delete({
    where: {
      hostUrl,
    },
  });
}

export function updateConnection(
  hostUrl: string,
  {
    newHostUrl,
    serviceUrl,
  }: {
    newHostUrl: string;
    serviceUrl: string;
  }
) {
  return prisma.connections.update({
    where: {
      hostUrl,
    },
    data: {
      hostUrl: newHostUrl,
      serviceUrl,
    },
  });
}
