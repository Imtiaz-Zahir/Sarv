import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function createUser({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) {
  return prisma.users.create({
    data: {
      email,
      name,
      password
    },
  });
}

export async function getUsersByEmail(email: string) {
  return prisma.users.findUnique({
    where: {
      email,
    },
  });
}
