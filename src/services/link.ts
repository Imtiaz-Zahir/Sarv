import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function createLink({
  name,
  userId,
  tunnelId,
  tunnelSecret,
}: {
  name: string;
  userId: string;
  tunnelId: string;
  tunnelSecret: string;
}) {
  return prisma.links.create({
    data: {
      name,
      userId,
      tunnelId,
      tunnelSecret,
    },
  });
}

export async function getLinks(userId?: string) {
  return prisma.links.findMany({
    where: {
      userId,
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
