import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function createLink({
  name,
  userEmail,
  tunnelId,
  tunnelSecret,
}: {
  name: string;
  userEmail: string;
  tunnelId: string;
  tunnelSecret: string;
}) {
  return prisma.links.create({
    data: {
      name,
      userEmail,
      tunnelId,
      tunnelSecret,
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
      connections: {
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
      },
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

export async function getLinkById(id: string) {
  return prisma.links.findUnique({
    where: {
      id,
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
