import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function createLink({
  id,
  name,
  userId,
  tunnelId,
  tunnelSecret,
}: {
  id: string;
  name: string;
  userId: string;
  tunnelId: string;
  tunnelSecret: string;
}) {
  return prisma.links.create({
    data: {
      id,
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

