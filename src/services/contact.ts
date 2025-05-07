import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function createContact({
  name,
  email,
  message,
  subject,
}: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  return prisma.contacts.create({
    data: {
      name,
      email,
      subject,
      message,
    },
  });
}
