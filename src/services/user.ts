import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function createUser({
  name,
  email,
  image,
  id,
}: {
  id: string;
  name: string;
  email: string;
  image: string;
}) {
  return prisma.users.create({
    data: {
      email,
      id,
      image,
      name,
    },
  });
}

export async function getUsersByID(id: string) {
  return prisma.users.findUnique({
    where: {
      id,
    },
    include: {
      links: true,
    },
  });
}
