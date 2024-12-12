import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function createLink({
  name,
  id,
  userId,
}: {
  id: string;
  name: string;
  userId: string;
}) {
  return prisma.links.create({
    data: {
      id,
      name,
      userId,
    },
  });
}
