import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function createLink({
  name,
  userEmail,
  tunnelId,
  tunnelToken,
  subscriptionEndAt,
  subscriptionStatus,
}: {
  name: string;
  userEmail: string;
  tunnelId: string;
  tunnelToken: string;
  subscriptionStatus?: string | null;
  subscriptionEndAt?: Date | null;
}) {
  return prisma.links.create({
    data: {
      name,
      userEmail,
      tunnelId,
      tunnelToken,
      subscriptionStatus,
      subscriptionEndAt,
    },
  });
}

export async function getLinks(userEmail?: string) {
  return prisma.links.findMany({
    where: {
      userEmail,
    },
    select: {
      id: true,
      name: true,
      createdAt: true,
    },
  });
}

export async function getLinkByName(name: string) {
  return prisma.links.findUnique({
    where: {
      name,
    },
  });
}

export async function getLinkById(id: string, takeConnections = true) {
  return prisma.links.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      userEmail: true,
      tunnelId: true,
      tunnelToken: true,
      subscriptionEndAt: true,
      subscriptionStatus: true,
      createdAt: true,
      connections: takeConnections
        ? {
            select: {
              id: true,
              name: true,
              createdAt: true,
              updatedAt: true,
              serviceIp: true,
              servicePort: true,
              serviceProtocol: true,
              linkId: true,
            },
          }
        : false,
    },
  });
}

export async function deleteLink(id: string) {
  return prisma.links.delete({
    where: {
      id,
    },
  });
}

export async function updateLink(
  id: string,
  {
    subscriptionEndAt,
    subscriptionStatus,
  }: {
    subscriptionEndAt?: Date | null;
    subscriptionStatus?: string;
  }
) {
  return prisma.links.update({
    where: {
      id,
    },
    data: {
      subscriptionEndAt,
      subscriptionStatus,
    },
  });
}
